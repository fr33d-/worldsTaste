import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as httpStatusCodes from "http-status-codes";
import sharp from "sharp";
import { CoffeeBrewingDto } from "../models/dtos/CoffeeBrewingDto";
import { ImageDto } from "../models/dtos/ImageDto";
import { CoffeeBrewingEntity } from "../models/entities/CoffeeBrewingEntity";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { ImagesEntity } from "../models/entities/ImageEntry";
import { createLogger } from "../utils/LoggerUtil";
import { Omit } from "../utils/TypeScriptUtils";

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

type WithBewingId = {
    brewId: number;
};

const log = createLogger("api:controllers:coffeeBrewing");

export const getAllBrewings: RequestHandler = async (_, result) => {
    console.log(`GET /bewings`);

    const coffeeBrewingEntity = await CoffeeBrewingEntity.find({
        relations: ["images"],
    });

    const coffeeDtos = coffeeBrewingEntity.map((entity) => {
        // entity.image = entity.image !== undefined ? [coffeeEntity.images[0]] : [];
        return CoffeeBrewingDto.fromEntity(entity);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(coffeeDtos);
};

// GET /:id
type GetBrewingByIdRequestParams = WithId;

export const getCoffeeBrewings: RequestHandler = async (request, result) => {
    const requestParams = request.params as unknown as GetBrewingByIdRequestParams;
    console.log(`GET /coffee/:id/brewings/ (id = ${requestParams.id})`);

    const coffeeBrewingEntity = await CoffeeBrewingEntity.find({
        where: { coffee: { id: requestParams.id } },
        relations: ["image"],
    });

    if (coffeeBrewingEntity !== undefined) {
        // console.log(coffeeBrewingEntity);
        result
            .status(httpStatusCodes.StatusCodes.OK)
            .json(coffeeBrewingEntity.map((entity) => new CoffeeBrewingDto(entity)));
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// POST /
type PostCoffeeBrewingByIdRequestParams = WithId;
type CreateCoffeeBrewingRequestBody = Omit<CoffeeBrewingDto, "id">;

export const createCoffeeBrewing: RequestHandler = async (request, result) => {
    console.log(`POST /coffee/id/brewing`);
    console.log(request.body);
    const { id } = request.params as unknown as PostCoffeeBrewingByIdRequestParams;
    const requestBody = request.body as CreateCoffeeBrewingRequestBody;
    const coffeeEntity = await CoffeeEntity.findOne({
        where: { id },
        relations: ["brewings"],
    });

    if (!coffeeEntity) {
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        return;
    }

    try {
        const coffeeBrewingEntity = CoffeeBrewingEntity.create({ ...requestBody });
        await CoffeeBrewingEntity.save(coffeeBrewingEntity);

        coffeeEntity.brewings = [coffeeBrewingEntity, ...coffeeEntity.brewings];
        console.log("Got new brewing for coffee:");
        console.log(coffeeEntity);

        await CoffeeEntity.save(coffeeEntity);
        console.log("coffee Brewing saved");
        result.location(`/brewings/${coffeeBrewingEntity.id}`).sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        console.log("error");
        console.log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCoffeeBrewingByIdRequestParams = {
    id: number;
    brewId: number;
};

export const deleteCoffeeBrewingById: RequestHandler = async (request, result) => {
    const { brewId } = request.params as unknown as DeleteCoffeeBrewingByIdRequestParams;
    console.log(`DELETE /coffeeBrewing/:id (id = ${brewId})`);
    const coffeeBrewingEntity = await CoffeeBrewingEntity.findOne({
        where: { id: brewId },
    });

    if (coffeeBrewingEntity !== undefined) {
        await CoffeeBrewingEntity.delete({ id: brewId });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// PUT /:id

type UpdateCoffeeBrewingByIdRequestParams = {
    id: number;
    brewId: number;
};
type UpdateCoffeeBrewingByIdRequestBody = CoffeeBrewingDto;

export const updateCoffeeBrewingById: RequestHandler = async (request, result) => {
    const { id, brewId } = request.params as unknown as UpdateCoffeeBrewingByIdRequestParams;
    const requestBody = request.body as UpdateCoffeeBrewingByIdRequestBody;
    console.log(`PUT /coffee/${id}/brewing/:${brewId}`);

    const coffeeBrewingEntity = await CoffeeBrewingEntity.findOne({
        where: { id: brewId },
    });

    if (coffeeBrewingEntity) {
        CoffeeBrewingEntity.merge(coffeeBrewingEntity, { ...requestBody });
        await CoffeeBrewingEntity.save(coffeeBrewingEntity);
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Post Assets
type PostCoffeeRequestParams = WithBewingId;

export const postExtractionAssets: RequestHandler = async (request, result) => {
    console.log("Posting new extraction image");
    if (request.files === undefined) {
        console.log("No images uploaded!");
        result.sendStatus(httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY);
        return;
    }

    const { brewId } = request.params as unknown as PostCoffeeRequestParams;
    const uploadImage = request?.files?.images as UploadedFile;

    const extractionEntity = await CoffeeBrewingEntity.findOne({
        where: { id: brewId },
        relations: ["image"],
    });
    if (!extractionEntity) {
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        console.log("cant find brewing wiht id", brewId);
        return;
    }
    const { data, name } = uploadImage;

    // resize
    const resizsedData = await sharp(data).resize(1200).toBuffer();

    try {
        const imageEntity = ImagesEntity.create({
            name: name,
            alt: name,
            description: name,
            file: Buffer.from(resizsedData).toString("base64"),
            extraction: extractionEntity,
        });
        await ImagesEntity.save(imageEntity);

        extractionEntity.image = imageEntity;
        console.log("Got new image for extraction");

        await CoffeeBrewingEntity.save(extractionEntity);
        console.log("extraction saved");
        result.status(httpStatusCodes.StatusCodes.CREATED).send(new ImageDto(imageEntity));
    } catch (error) {
        console.log("error");
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }

    // result.sendStatus(httpStatusCodes.StatusCodes.CREATED);
};

// DELETE Asset /:id
type DeleteCoffeeImageByIdRequestParams = { brewId: number; imgId: number };

export const deleteExtractionImageByURL: RequestHandler = async (request, result) => {
    console.log("Delete extraction image ");

    const { brewId, imgId } = request.params as unknown as DeleteCoffeeImageByIdRequestParams;

    const extractionEntity = await CoffeeBrewingEntity.findOne({
        where: { id: brewId },
        relations: ["image"],
    });
    if (!extractionEntity) {
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        console.log("cant find brewing wiht id", brewId);
        return;
    }

    try {
        extractionEntity.image = null;
        await CoffeeBrewingEntity.save(extractionEntity);
        console.log("Deleted image from brewing");
    } catch {
        console.log("Cant deleted image from brewing");
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
        return;
    }

    console.log(`DELETE image :id (id = ${imgId})`);
    const imageEntity = await ImagesEntity.findOne({ where: { id: imgId } });

    if (imageEntity !== undefined) {
        imageEntity.extraction = undefined;
        await ImagesEntity.save(imageEntity);

        await ImagesEntity.delete({ id: imgId });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }

    // Müsste man hier nicht noch die extraction anpassen

    console.log("deleted");
};

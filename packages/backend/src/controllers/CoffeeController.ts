import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as httpStatusCodes from "http-status-codes";
import sharp from "sharp";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { ImageDto } from "../models/dtos/ImageDto";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { ImagesEntity } from "../models/entities/ImageEntry";
import { RoasterEntity } from "../models/entities/RoasterEntity";
import { createLogger } from "../utils/LoggerUtil";
import { Omit } from "../utils/TypeScriptUtils";

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

const log = createLogger("api:controllers:coffee");

// GET /
export const getAllCoffees: RequestHandler = async (_, result) => {
    console.log(`GET /coffee`);

    const coffeeEntities = await CoffeeEntity.find({
        relations: ["images", "roaster"],
    });

    const coffeeDtos = coffeeEntities.map((coffeeEntity) => {
        coffeeEntity.images = coffeeEntity.images.length > 0 !== undefined ? [coffeeEntity.images[0]] : [];
        return CoffeeDto.fromEntity(coffeeEntity);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(coffeeDtos);
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCoffeeById: RequestHandler = async (request, result) => {
    const requestParams = request.params as unknown as GetUserByIdRequestParams;

    console.log(`GET /coffee/:id (id = ${requestParams.id})`);

    const coffeeEntity = await CoffeeEntity.findOne({
        where: { id: requestParams.id },
        relations: ["store", "images", "owner", "roaster"],
    });

    if (coffeeEntity) {
        result.status(httpStatusCodes.StatusCodes.OK).json(new CoffeeDto(coffeeEntity));
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// POST /
type CreateCoffeeRequestBody = Omit<CoffeeDto, "id">;

export const createCoffee: RequestHandler = async (request, result) => {
    console.log(`POST /coffee`);
    const requestBody = request.body as CreateCoffeeRequestBody;
    const coffeeEntity = CoffeeEntity.create({ ...requestBody, brewings: [], roaster: undefined });

    if (requestBody.roaster?.id) {
        const roasterEntity = await RoasterEntity.findOne({ where: { id: requestBody.roaster.id } });
        coffeeEntity.roaster = roasterEntity;
    } else {
        coffeeEntity.roaster = undefined;
    }

    try {
        await CoffeeEntity.save(coffeeEntity);
        console.log("coffee saved");
        result.location(`/coffee/${coffeeEntity.id}`).sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        console.log("error", error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCoffeeByIdRequestParams = WithId;

export const deleteCoffeeById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCoffeeByIdRequestParams;
    console.log(`DELETE /coffee/:id (id = ${id})`);
    const coffeeEntity = await CoffeeEntity.findOne({ where: { id } });

    if (coffeeEntity !== undefined) {
        await CoffeeEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// PUT /:id
type UpdateCoffeeByIdRequestParams = WithId;
type UpdateCoffeeByIdRequestBody = CoffeeDto;

export const updateCoffeeById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as UpdateCoffeeByIdRequestParams;
    console.log(`PUT /coffee/:id (id = ${id})`);
    const requestBody = request.body as UpdateCoffeeByIdRequestBody;
    const coffeeEntity = await CoffeeEntity.findOne({ where: { id }, relations: ["roaster"] });

    if (coffeeEntity) {
        if (requestBody.roaster?.id) {
            const roasterEntity = await RoasterEntity.findOne({ where: { id: requestBody.roaster.id } });

            if (coffeeEntity.id !== requestBody.id) {
                result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
            } else if (roasterEntity) {
                coffeeEntity.roaster = roasterEntity;
                CoffeeEntity.merge(coffeeEntity, { ...requestBody });
                await CoffeeEntity.save(coffeeEntity);
                result.sendStatus(httpStatusCodes.StatusCodes.OK);
            } else {
            }
        } else {
            CoffeeEntity.merge(coffeeEntity, { ...requestBody });
            await CoffeeEntity.save(coffeeEntity);
            result.sendStatus(httpStatusCodes.StatusCodes.OK);
        }
    } else {
        console.log(`not found`);
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Post Assets
type PostCoffeeRequestParams = WithId;

export const postCoffeesAssets: RequestHandler = async (request, result) => {
    log("Posting new coffee assets");
    if (request.files === undefined) {
        log("No images uploaded!");
        result.sendStatus(httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY);
        return;
    }

    const { id } = request.params as unknown as PostCoffeeRequestParams;
    const uploadImage = request?.files?.images as UploadedFile;

    const coffeeEntity = await CoffeeEntity.findOne({
        where: { id },
        relations: ["images"],
    });
    if (!coffeeEntity) {
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
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
            coffee: coffeeEntity,
        });
        await ImagesEntity.save(imageEntity);

        coffeeEntity.images = [imageEntity, ...coffeeEntity.images];
        log("Got new image for coffee:");

        await CoffeeEntity.save(coffeeEntity);
        log("coffee saved");
        result.status(httpStatusCodes.StatusCodes.CREATED).send(new ImageDto(imageEntity));
    } catch (error) {
        log("error");
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }

    // result.sendStatus(httpStatusCodes.CREATED);
};

// DELETE Asset /:id
type DeleteCoffeeImageByIdRequestParams = { id: number };

export const deleteCoffeeImageByURL: RequestHandler = async (request, result) => {
    log("Delete coffee by url");

    const { id } = request.params as unknown as DeleteCoffeeImageByIdRequestParams;

    log(`DELETE image :id (id = ${id})`);
    const imageEntity = await ImagesEntity.findOne({ where: { id } });

    if (imageEntity !== undefined) {
        await ImagesEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }

    // log("deleted");
    // result.sendStatus(httpStatusCodes.StatusCodes.OK);
};

import { isNumber } from "class-validator";
import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as httpStatusCodes from "http-status-codes";
import sharp from "sharp";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { ImageDto } from "../models/dtos/ImageDto";
import { RoasterDto } from "../models/dtos/RoasterDto";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { ImagesEntity } from "../models/entities/ImageEntry";
import { RoasterEntity } from "../models/entities/RoasterEntity";
import { Omit } from "../utils/TypeScriptUtils";

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

// GET /
export const getAllRoaster: RequestHandler = async (_, result) => {
    console.log(`GET /roaster`);

    const roasterEntities = await RoasterEntity.find({
        relations: ["images"],
    });

    const roasterDtos = roasterEntities.map((cur) => {
        cur.images = cur.images.length > 0 !== undefined ? [cur.images[0]] : [];
        return RoasterDto.fromEntity(cur);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(roasterDtos);
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getRoasterById: RequestHandler = async (request, result) => {
    const requestParams = request.params as unknown as GetUserByIdRequestParams;

    console.log(`GET /roaster/:id (id = ${requestParams.id})`);

    if (!requestParams.id || !isNumber(Number(requestParams.id)))
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    else {
        const roasterEntity = await RoasterEntity.findOne({
            where: { id: requestParams.id },
            relations: ["images"],
        });

        const coffeeEntities = await CoffeeEntity.find({
            relations: ["roaster"],
            loadRelationIds: true,
            where: {
                roaster: {
                    id: requestParams.id,
                },
            },
        });

        const res = new RoasterDto(roasterEntity);
        const roasterCoffees = coffeeEntities
            .map((cur) => CoffeeDto.fromEntity(cur))
            .map((cur) => ({ id: cur.id, name: cur.name, rating: cur.rating }));

        if (roasterEntity) {
            result.status(httpStatusCodes.StatusCodes.OK).json({ ...res, coffees: roasterCoffees });
        } else {
            result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
        }
    }
};

// POST /
type CreateRoasterRequestBody = Omit<RoasterDto, "id">;

export const createRoaster: RequestHandler = async (request, result) => {
    console.log(`POST /roaster`);
    console.log(request.body);
    const requestBody = request.body as CreateRoasterRequestBody;
    const roasterEntity = RoasterEntity.create({ ...requestBody, images: [] });
    console.log("roasterEntity", roasterEntity);

    try {
        await RoasterEntity.save(roasterEntity);
        console.log("roaster saved");
        result.location(`/roaster/${roasterEntity.id}`).sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        console.log("error");
        console.log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteRoasterByIdRequestParams = WithId;

export const deleteRoasterById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteRoasterByIdRequestParams;
    console.log(`DELETE /roaster/:id (id = ${id})`);
    const roasterEntity = await RoasterEntity.findOne({ where: { id } });

    if (roasterEntity !== undefined) {
        await RoasterEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// PUT /:id
type UpdateRoasterByIdRequestParams = WithId;
type UpdateRoasterByIdRequestBody = RoasterDto;

export const updateRoasterById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as UpdateRoasterByIdRequestParams;
    console.log(`PUT /roaster/:id (id = ${id})`);

    const requestBody = request.body as UpdateRoasterByIdRequestBody;
    const roasterEntity = await RoasterEntity.findOne({ where: { id } });

    if (roasterEntity) {
        if (roasterEntity.id !== requestBody.id) {
            console.log(roasterEntity.id);
            console.log(requestBody);
            console.log(id);
            console.log(roasterEntity.id !== requestBody.id);
            result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        } else {
            RoasterEntity.merge(roasterEntity, { ...requestBody });
            await RoasterEntity.save(roasterEntity);
            result.sendStatus(httpStatusCodes.StatusCodes.OK);
        }
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Post Assets
type PostRoasterRequestParams = WithId;

export const postRoasterAssets: RequestHandler = async (request, result) => {
    console.log("Posting new roaster assets");
    if (request.files === undefined) {
        console.log("No images uploaded!");
        result.sendStatus(httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY);
        return;
    }

    const { id } = request.params as unknown as PostRoasterRequestParams;
    const uploadImage = request?.files?.images as UploadedFile;

    const roasterEntity = await RoasterEntity.findOne({
        where: { id },
        relations: ["images"],
    });
    if (!roasterEntity) {
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
            store: roasterEntity,
        });
        await ImagesEntity.save(imageEntity);

        roasterEntity.images = [imageEntity, ...roasterEntity.images];
        console.log("Got new image for roaster:");

        await RoasterEntity.save(roasterEntity);
        console.log("roaster saved");
        result.status(httpStatusCodes.StatusCodes.CREATED).send(new ImageDto(imageEntity));
    } catch (error) {
        console.log("error", error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

// DELETE Asset /:id
type DeleteRoasterImageByIdRequestParams = { id: number };

export const deleteRoasterImageByURL: RequestHandler = async (request, result) => {
    console.log("Delete roaster by url");

    const { id } = request.params as unknown as DeleteRoasterImageByIdRequestParams;

    console.log(`DELETE image :id (id = ${id})`);
    const imageEntity = await ImagesEntity.findOne({ where: { id } });

    if (imageEntity !== undefined) {
        await ImagesEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

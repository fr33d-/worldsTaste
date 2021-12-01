import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";
import * as httpStatusCodes from "http-status-codes";
import * as path from "path";
import sharp from "sharp";
import uniqid from "uniqid";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { ImagesEntity } from "../models/entities/ImageEntry";
import { createLogger } from "../utils/LoggerUtil";
import { Omit } from "../utils/TypeScriptUtils";

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

const log = createLogger("api:controllers:coffee");

// GET /
export const getAllCoffees: RequestHandler = async (_, result) => {
    log(`GET /coffee`);

    const coffeeEntities = await CoffeeEntity.find({
        relations: ["store", "images"],
    });

    //Append images
    // const uploadsFolder = path.join(__dirname, "../../uploads/coffee-images");
    // const coffeeDtos = coffeeEntities.map((coffeeEntity) => {
    //     const coffeeDto = CoffeeDto.fromEntity(coffeeEntity);

    //     const imagePath = path.join(uploadsFolder, String(coffeeEntity.id));
    //     if (fs.existsSync(imagePath)) {
    //         const images = fs.readdirSync(imagePath).map((item) => `/coffee/assets/${coffeeEntity.id}/${item}`);
    //         coffeeDto.imageStrings = images;
    //     }
    //     return coffeeDto;
    // });

    const coffeeDtos = coffeeEntities.map((coffeeEntity) => {
        return CoffeeDto.fromEntity(coffeeEntity);

        // const imagePath = path.join(uploadsFolder, String(coffeeEntity.id));
        // if (fs.existsSync(imagePath)) {
        //     const images = fs.readdirSync(imagePath).map((item) => `/coffee/assets/${coffeeEntity.id}/${item}`);
        //     coffeeDto.imageStrings = images;
        // }
    });

    result.status(httpStatusCodes.OK).json(coffeeDtos);
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCoffeeById: RequestHandler = async (request, result) => {
    const requestParams = (request.params as unknown) as GetUserByIdRequestParams;

    log(`GET /coffee/:id (id = ${requestParams.id})`);

    const coffeeEntity = await CoffeeEntity.findOne({
        where: { id: requestParams.id },
        relations: ["store", "images"],
    });

    if (coffeeEntity !== undefined) {
        result.status(httpStatusCodes.OK).json(new CoffeeDto(coffeeEntity));
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// POST /
type CreateCoffeeRequestBody = Omit<CoffeeDto, "id">;

export const createCoffee: RequestHandler = async (request, result) => {
    log(`POST /coffee`);
    log(request.body);
    const requestBody = request.body as CreateCoffeeRequestBody;
    const coffeeEntity = CoffeeEntity.create({ ...requestBody, brewings: [] });

    try {
        await CoffeeEntity.save(coffeeEntity);
        log("coffee saved");
        result.location(`/coffee/${coffeeEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log("error");
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCoffeeByIdRequestParams = WithId;

export const deleteCoffeeById: RequestHandler = async (request, result) => {
    const { id } = (request.params as unknown) as DeleteCoffeeByIdRequestParams;
    log(`DELETE /coffee/:id (id = ${id})`);
    const coffeeEntity = await CoffeeEntity.findOne({ where: { id } });

    if (coffeeEntity !== undefined) {
        await CoffeeEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// PUT /:id
type UpdateCoffeeByIdRequestParams = WithId;
type UpdateCoffeeByIdRequestBody = CoffeeDto;

export const updateCoffeeById: RequestHandler = async (request, result) => {
    const { id } = (request.params as unknown) as UpdateCoffeeByIdRequestParams;
    log(`PUT /coffee/:id (id = ${id})`);
    const requestBody = request.body as UpdateCoffeeByIdRequestBody;
    const coffeeEntity = await CoffeeEntity.findOne({ where: { id } });

    if (coffeeEntity !== undefined) {
        if (coffeeEntity.id !== requestBody.id) {
            log(coffeeEntity.id);
            log(requestBody);
            log(id);
            log(coffeeEntity.id !== requestBody.id);
            result.sendStatus(httpStatusCodes.CONFLICT);
        } else {
            CoffeeEntity.merge(coffeeEntity, { ...requestBody });
            await CoffeeEntity.save(coffeeEntity);
            result.sendStatus(httpStatusCodes.OK);
        }
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

export const getCoffeesAssets: RequestHandler = async (request, result) => {
    const coffeeId = request.params.id;
    const uploadsFolder = path.join(__dirname, "../../uploads/coffee-images");
    const coffeeImages = path.join(uploadsFolder, coffeeId);
    if (!fs.existsSync(coffeeImages)) {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
        return;
    }

    const files = fs.readdirSync(coffeeImages);

    // const coffeeId = request.params.id;
    // const uploadsFolder = path.join(__dirname, "../../uploads/coffee-images");
    // const coffeeImages = path.join(uploadsFolder, coffeeId);
    // if (!fs.existsSync(coffeeImages)) {
    //     result.sendStatus(httpStatusCodes.NOT_FOUND);
    //     return;
    // }

    // const files = fs.readdirSync(coffeeImages);
    result.status(httpStatusCodes.OK).send();
};

//Post Assets
type PostCoffeeRequestParams = WithId;

export const postCoffeesAssets: RequestHandler = async (request, result) => {
    log("Posting new coffee assets");
    if (request.files === undefined) {
        log("No images uploaded!");
        result.sendStatus(httpStatusCodes.UNPROCESSABLE_ENTITY);
        return;
    }

    const { id } = (request.params as unknown) as PostCoffeeRequestParams;
    const images = request.files.images as UploadedFile[];
    const imagesArray = Array.isArray(images) ? images : [images];
    // const imageStrings = [];
    let errorHappend = false;

    // --- Image to db

    const coffeeEntity = await CoffeeEntity.findOne({ where: { id }, relations: ["images"] });
    if (coffeeEntity === undefined) {
        result.sendStatus(httpStatusCodes.CONFLICT);
        return;
    }
    for (const { data, name } of imagesArray) {
        // resize

        const resizsedData = await sharp(data)
            .resize(1200)
            .toBuffer();

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
            // result.location(`/images/${imageEntity.id}`).sendStatus(httpStatusCodes.CREATED); // might not work
        } catch (error) {
            log("error");
            // log(error);
            errorHappend = true;
            result.sendStatus(httpStatusCodes.CONFLICT); // send conflict for loop?
        }

        if (errorHappend) {
            result.sendStatus(httpStatusCodes.CONFLICT);
        }
        result.sendStatus(httpStatusCodes.CREATED); // might not work
    }

    // end ----

    // --- Image fo fs

    // for (const file of imagesArray) {
    //     log("New asset");
    //     const targetPath = `./uploads/coffee-images/${id}`;
    //     if (!fs.existsSync(targetPath)) {
    //         fs.mkdirSync(targetPath, { recursive: true });
    //     }
    //     const fileName = `${targetPath}/${uniqid()}.${file.name.split(".").slice(-1)[0]}`;
    //     await file.mv(fileName);
    //     imageStrings.push(fileName);
    // }

    // end ----

    // result.location(String(imageStrings)).sendStatus(httpStatusCodes.OK);
};

// DELETE Asset /:id
type DeleteCoffeeImageByIdRequestParams = { id: number };
type DeleteCoffeeImageByIdRequestBody = { url: string };

export const deleteCoffeeImageByURL: RequestHandler = async (request, result) => {
    log("Delete coffee by url");

    const { id } = (request.params as unknown) as DeleteCoffeeImageByIdRequestParams;
    const { url } = request.body as DeleteCoffeeImageByIdRequestBody;

    const fileName = url.split("/").slice(-1)[0];
    const targetPath = `./uploads/coffee-images/${id}`;

    try {
        fs.unlinkSync(`${targetPath}/${fileName}`);
    } catch (err) {
        log(err);
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }

    // log(`DELETE image :id (id = ${imageId})`);
    // const imageEntity = await ImagesEntity.findOne({ where: { id } });

    // if (imageEntity !== undefined) {
    //     await imageEntity.delete({ id });
    //     result.sendStatus(httpStatusCodes.OK);
    // } else {
    //     result.sendStatus(httpStatusCodes.NOT_FOUND);
    // }

    log("deleted" + targetPath + "/" + fileName);
    result.sendStatus(httpStatusCodes.OK);
};

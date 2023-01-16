import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as httpStatusCodes from "http-status-codes";
import sharp from "sharp";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { ImageDto } from "../models/dtos/ImageDto";
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

    const coffeeDtos = coffeeEntities.map((coffeeEntity) => {
        coffeeEntity.images = coffeeEntity.images.length > 0 !== undefined ? [coffeeEntity.images[0]] : [];
        return CoffeeDto.fromEntity(coffeeEntity);
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

// export const getCoffeesAssets: RequestHandler = async (request, result) => {
//     const coffeeId = request.params.id;
//     const uploadsFolder = path.join(__dirname, "../../uploads/coffee-images");
//     const coffeeImages = path.join(uploadsFolder, coffeeId);
//     if (!fs.existsSync(coffeeImages)) {
//         result.sendStatus(httpStatusCodes.NOT_FOUND);
//         return;
//     }

//     const files = fs.readdirSync(coffeeImages);

//     // const coffeeId = request.params.id;
//     // const uploadsFolder = path.join(__dirname, "../../uploads/coffee-images");
//     // const coffeeImages = path.join(uploadsFolder, coffeeId);
//     // if (!fs.existsSync(coffeeImages)) {
//     //     result.sendStatus(httpStatusCodes.NOT_FOUND);
//     //     return;
//     // }

//     // const files = fs.readdirSync(coffeeImages);
//     result.status(httpStatusCodes.OK).send();
// };

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
    const uploadImage = request?.files?.images as UploadedFile;

    const coffeeEntity = await CoffeeEntity.findOne({ where: { id }, relations: ["images"] });
    if (coffeeEntity === undefined) {
        result.sendStatus(httpStatusCodes.CONFLICT);
        return;
    }
    const { data, name } = uploadImage;

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
        result.status(httpStatusCodes.CREATED).send(new ImageDto(imageEntity));
    } catch (error) {
        log("error");
        result.sendStatus(httpStatusCodes.CONFLICT);
    }

    // result.sendStatus(httpStatusCodes.CREATED);
};

// DELETE Asset /:id
type DeleteCoffeeImageByIdRequestParams = { id: number };

export const deleteCoffeeImageByURL: RequestHandler = async (request, result) => {
    log("Delete coffee by url");

    const { id } = (request.params as unknown) as DeleteCoffeeImageByIdRequestParams;

    log(`DELETE image :id (id = ${id})`);
    const imageEntity = await ImagesEntity.findOne({ where: { id } });

    if (imageEntity !== undefined) {
        await ImagesEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }

    log("deleted");
    result.sendStatus(httpStatusCodes.OK);
};

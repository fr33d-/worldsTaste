import { RequestHandler, Request, Response } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { CoffeeDto } from '../models/dtos/CoffeeDto';
import { CoffeeEntity } from '../models/entities/CoffeeEntity';
import { createLogger } from '../utils/LoggerUtil';
import { Omit } from '../utils/TypeScriptUtils';
import fileUpload, { UploadedFile } from 'express-fileupload';
import * as path from "path";
import * as fs from "fs";

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

const log = createLogger('api:controllers:coffee');

// GET /
export const getAllCoffees: RequestHandler = async (_, result) => {
    log(`GET /coffee`);

    const coffeeEntities = await CoffeeEntity.find({ relations: ['origin', 'kind', 'roasted'] });
    result.status(httpStatusCodes.OK).json(coffeeEntities.map(CoffeeDto.fromEntity));
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCoffeeById: RequestHandler = async (request, result) => {
    const requestParams = request.params as GetUserByIdRequestParams;

    log(`GET /coffee/:id (id = ${requestParams.id})`);

    const coffeeEntity = await CoffeeEntity.findOne({
        where: { id: requestParams.id },
        relations: ['origin', 'kind', 'roasted'],
    });

    if (coffeeEntity !== undefined) {
        result.status(httpStatusCodes.OK).json(new CoffeeDto(coffeeEntity));
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

//GET Assets

export const getCoffeesAssets: RequestHandler = async (request, result) => {
    const coffeeId = request.params.id;

    const uploadsFolder = path.join(__dirname, '../uploads/coffee-images');
    const coffeeImages = path.join(uploadsFolder, coffeeId);
    if (fs.existsSync(coffeeImages)) {
        const files = fs.readdirSync(coffeeImages);
        result.status(httpStatusCodes.OK).send(files.map((item) => `/static/coffee-images/${coffeeId}/${item}`));
        return;
    }

    result.sendStatus(httpStatusCodes.NOT_FOUND);
};

// POST /
type CreateCoffeeRequestBody = Omit<CoffeeDto, 'id'>;

export const createCoffee: RequestHandler = async (request, result) => {
    log(`POST /coffee`);
    log(request.body);
    const requestBody = request.body as CreateCoffeeRequestBody;
    const coffeeEntity = CoffeeEntity.create({ ...requestBody });

    try {
        await CoffeeEntity.save(coffeeEntity);
        log('coffee saved');
        result.location(`/users/${coffeeEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log('error');
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCoffeeByIdRequestParams = WithId;

export const deleteCoffeeById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeByIdRequestParams;
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
    const { id } = request.params as UpdateCoffeeByIdRequestParams;
    log(`PUT /coffee/:id (id = ${id})`);
    const requestBody = request.body as UpdateCoffeeByIdRequestBody;
    const coffeeEntity = await CoffeeEntity.findOne({ where: { id } });

    if (coffeeEntity !== undefined) {
        if (request.files !== undefined) {
            await (request.files.images as UploadedFile[]).forEach(async (file) => {
                const targetPath = `./uploads/coffee-images/${request.params.id}`;
                if (!fs.existsSync(targetPath)) {
                    fs.mkdirSync(targetPath, { recursive: true });
                }
                await file.mv(`${targetPath}/${file.name}`);
            });
        }

        if (coffeeEntity.id !== requestBody.id) {
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

// TEST

// export const uploadImage: RequestHandler = async (request, result) => {
//     log(`UploadImage`);
//     console.log(request.files);

//     if (request.files !== undefined) {
//         await (request.files.singleImage as UploadedFile).mv("./foo.png");
//     }

//     result.sendStatus(200);
// };

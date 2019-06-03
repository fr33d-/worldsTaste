import { RequestHandler } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { CoffeeDto } from '../models/dtos/CoffeeDto';
import { CoffeeEntity } from '../models/entities/CoffeeEntity';
import { createLogger } from '../utils/LoggerUtil';
import { Omit } from '../utils/TypeScriptUtils';

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

const log = createLogger('api:controllers:coffee');

// type Coffee = {
//     id: number;
//     name: string;
//     description: string;
//     origin: string;
//     rating: number;
//     kind: string;
//     roasted: string;
// };

// GET /
export const getAllCoffees: RequestHandler = async (_, result) => {
    log(`GET /coffee`);

    const coffeeEntities = await CoffeeEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeEntities.map(CoffeeDto.fromEntity));
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCoffeeById: RequestHandler = async (request, result) => {
    const requestParams = request.params as GetUserByIdRequestParams;

    log(`GET /coffee/:id (id = ${requestParams.id})`);

    const coffeeEntity = await CoffeeEntity.findOne({ where: { id: requestParams.id } });

    if (coffeeEntity !== undefined) {
        result.status(httpStatusCodes.OK).json(new CoffeeDto(coffeeEntity));
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }

    // result.status(httpStatusCodes.OK).json(exampleCoffee);
};

// POST /
type CreateCoffeeRequestBody = Omit<CoffeeDto, 'id'>;

export const createCoffee: RequestHandler = async (request, result) => {
    log(`POST /coffee`);
    const requestBody = request.body as CreateCoffeeRequestBody;
    const coffeeEntity = CoffeeEntity.create({ ...requestBody });

    try {
        await CoffeeEntity.save(coffeeEntity);
        result.location(`/users/${coffeeEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
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

    // exampleCoffee = exampleCoffee.filter((item) => item.id !== Number(id));
    // result.sendStatus(httpStatusCodes.OK);
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


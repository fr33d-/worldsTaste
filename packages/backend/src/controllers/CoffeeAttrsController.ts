import { RequestHandler } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { CoffeeKindDto, CoffeeOriginDto, CoffeeRoastedDto } from '../models/dtos/CoffeeAttrDto';
import { CoffeeKindEntity, CoffeeOriginEntity, CoffeeRoastedEntity } from '../models/entities/CoffeeAttrsEntity';
import { createLogger } from '../utils/LoggerUtil';
import { Omit } from '../utils/TypeScriptUtils';

const log = createLogger('api:controllers:coffee');

type WithId = {
    id: number;
};

// GETS for menu, filtering and selection

export const getCoffeeOrigins: RequestHandler = async (_, result) => {
    log(`GET /coffee/origins`);

    const coffeeOriginEntities = await CoffeeOriginEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeOriginEntities.map(CoffeeOriginDto.fromEntity));
};

export const getCoffeeKinds: RequestHandler = async (_, result) => {
    log(`GET /coffee/kinds`);

    const coffeeKindEntities = await CoffeeKindEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeKindEntities.map(CoffeeKindDto.fromEntity));
};

export const getCoffeeRoasteds: RequestHandler = async (_, result) => {
    log(`GET /coffee/roasteds`);

    const coffeeRoastedEntities = await CoffeeRoastedEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeRoastedEntities.map(CoffeeRoastedDto.fromEntity));
};

// POSTs for menu, filtering and selection

type CreateCoffeeOriginRequestBody = Omit<CoffeeOriginDto, 'id'>;

export const createCoffeeOrigin: RequestHandler = async (request, result) => {
    log(`POST /coffeeAttrs/origins`);
    const requestBody = request.body as CreateCoffeeOriginRequestBody;
    const coffeeOriginEntity = CoffeeOriginEntity.create({ ...requestBody });

    try {
        await CoffeeOriginEntity.save(coffeeOriginEntity);
        result.location(`/coffeeAttrs/origins/${coffeeOriginEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

type CreateCoffeeRoastedRequestBody = Omit<CoffeeOriginDto, 'id'>;

export const createCoffeeRoasteds: RequestHandler = async (request, result) => {
    log(`POST /coffeeAttrs/roasteds`);
    const requestBody = request.body as CreateCoffeeRoastedRequestBody;
    const coffeeRoastedsEntity = CoffeeRoastedEntity.create({ ...requestBody });

    try {
        await CoffeeRoastedEntity.save(coffeeRoastedsEntity);
        result.location(`/coffeeAttrs/roasteds/${coffeeRoastedsEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

type CreateCoffeeKindRequestBody = Omit<CoffeeOriginDto, 'id'>;

export const createCoffeeKinds: RequestHandler = async (request, result) => {
    log(`POST /coffeeAttrs/kinds`);
    const requestBody = request.body as CreateCoffeeKindRequestBody;
    const coffeeKindsEntity = CoffeeKindEntity.create({ ...requestBody });

    try {
        await CoffeeKindEntity.save(coffeeKindsEntity);
        result.location(`/coffeeAttrs/kinds/${coffeeKindsEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};


// DELETE /:id

type DeleteCoffeeRoastedsByIdRequestParams = WithId;

export const deleteCoffeeRoastedsById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeRoastedsByIdRequestParams;
    log(`DELETE /coffeeAttrs/Roasteds/:id (id = ${id})`);
    const coffeeRoastedEntity = await CoffeeRoastedEntity.findOne({ where: { id } });

    if (coffeeRoastedEntity !== undefined) {
        await CoffeeRoastedEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};


type DeleteCoffeeKindsByIdRequestParams = WithId;

export const deleteCoffeeKindsById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeKindsByIdRequestParams;
    log(`DELETE /coffeeAttrs/kinds/:id (id = ${id})`);
    const coffeeKindEntity = await CoffeeKindEntity.findOne({ where: { id } });

    if (coffeeKindEntity !== undefined) {
        await CoffeeKindEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};


type DeleteCoffeeOriginsByIdRequestParams = WithId;

export const deleteCoffeeOriginById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeOriginsByIdRequestParams;
    log(`DELETE /coffeeAttrs/origins/:id (id = ${id})`);
    const coffeeOriginEntity = await CoffeeOriginEntity.findOne({ where: { id } });

    if (coffeeOriginEntity !== undefined) {
        await CoffeeOriginEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};
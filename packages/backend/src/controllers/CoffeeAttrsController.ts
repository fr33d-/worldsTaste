import { RequestHandler } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { CoffeeKindDto, CoffeeOriginDto, CoffeeRoastedDto, CoffeeSpeciesDto, CoffeeProcessDto, CoffeeMethodDto } from '../models/dtos/CoffeeAttrDto';
import { CoffeeKindEntity, CoffeeOriginEntity, CoffeeRoastedEntity, CoffeeSpeciesEntity, CoffeeProcessEntity, CoffeeMethodEntity } from '../models/entities/CoffeeAttrsEntity';
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

export const getCoffeeSpecies: RequestHandler = async (_, result) => {
    log(`GET /coffee/Species`);

    const coffeeSpeciesEntities = await CoffeeSpeciesEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeSpeciesEntities.map(CoffeeSpeciesDto.fromEntity));
};

export const getCoffeeProcesses: RequestHandler = async (_, result) => {
    log(`GET /coffee/roasteds`);

    const coffeeProcessEntities = await CoffeeProcessEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeProcessEntities.map(CoffeeProcessDto.fromEntity));
};

export const getCoffeeMethodes: RequestHandler = async (_, result) => {
    log(`GET /coffee/method`);

    const coffeeMethodEntities = await CoffeeMethodEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeMethodEntities.map(CoffeeMethodDto.fromEntity));
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

type CreateCoffeeKindRequestBody = Omit<CoffeeKindDto, 'id'>;

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

type CreateCoffeeSpeciesRequestBody = Omit<CoffeeSpeciesDto, 'id'>;

export const createCoffeeSpecies: RequestHandler = async (request, result) => {
    log(`POST /coffeeAttrs/Species`);
    const requestBody = request.body as CreateCoffeeSpeciesRequestBody;
    const coffeeSpeciesEntity = CoffeeSpeciesEntity.create({ ...requestBody });

    try {
        await CoffeeSpeciesEntity.save(coffeeSpeciesEntity);
        result.location(`/coffeeAttrs/species/${coffeeSpeciesEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

type CreateCoffeeProcessRequestBody = Omit<CoffeeProcessDto, 'id'>;

export const createCoffeeProcess: RequestHandler = async (request, result) => {
    log(`POST /coffeeAttrs/process`);
    const requestBody = request.body as CreateCoffeeProcessRequestBody;
    const coffeeProcessEntity = CoffeeProcessEntity.create({ ...requestBody });

    try {
        await CoffeeProcessEntity.save(coffeeProcessEntity);
        result.location(`/coffeeAttrs/process/${coffeeProcessEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

type CreateCoffeeMethodRequestBody = Omit<CoffeeMethodDto, 'id'>;

export const createCoffeeMethod: RequestHandler = async (request, result) => {
    log(`POST /coffeeAttrs/method`);
    const requestBody = request.body as CreateCoffeeMethodRequestBody;
    const coffeeMethodEntity = CoffeeMethodEntity.create({ ...requestBody });

    try {
        await CoffeeMethodEntity.save(coffeeMethodEntity);
        result.location(`/coffeeAttrs/method/${coffeeMethodEntity.id}`).sendStatus(httpStatusCodes.CREATED);
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

type DeleteCoffeeSpeciesByIdRequestParams = WithId;

export const deleteCoffeeSpeciesById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeSpeciesByIdRequestParams;
    log(`DELETE /coffeeAttrs/species/:id (id = ${id})`);
    const coffeeSpeciesEntity = await CoffeeSpeciesEntity.findOne({ where: { id } });

    if (coffeeSpeciesEntity !== undefined) {
        await CoffeeSpeciesEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

type DeleteCoffeeProcessByIdRequestParams = WithId;

export const deleteCoffeeProcessById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeProcessByIdRequestParams;
    log(`DELETE /coffeeAttrs/process/:id (id = ${id})`);
    const coffeeProcessEntity = await CoffeeProcessEntity.findOne({ where: { id } });

    if (coffeeProcessEntity !== undefined) {
        await CoffeeProcessEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

type DeleteCoffeeMethodByIdRequestParams = WithId;

export const deleteCoffeeMethodById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeMethodByIdRequestParams;
    log(`DELETE /coffeeAttrs/method/:id (id = ${id})`);
    const coffeeMethodEntity = await CoffeeMethodEntity.findOne({ where: { id } });

    if (coffeeMethodEntity !== undefined) {
        await CoffeeMethodEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};




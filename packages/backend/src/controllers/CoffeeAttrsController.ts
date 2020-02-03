import { RequestHandler } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { createLogger } from '../utils/LoggerUtil';
import { Omit } from '../utils/TypeScriptUtils';
import { CoffeeStoreEntity } from '../models/entities/CoffeeStoresEntity';
import { CoffeeStoreDto } from '../models/dtos/CoffeeAttrDto';

const log = createLogger('api:controllers:coffee');

type WithId = {
    id: number;
};

// GETS for menu, filtering and selection

export const getCoffeeStores: RequestHandler = async (_, result) => {
    log(`GET /coffeeStores`);

    const coffeeStoresEntities = await CoffeeStoreEntity.find();
    result.status(httpStatusCodes.OK).json(coffeeStoresEntities.map(CoffeeStoreDto.fromEntity));
};

// POSTs for menu, filtering and selection

type CreateCoffeeStoresRequestBody = Omit<CoffeeStoreDto, 'id'>;

export const createCoffeeStore: RequestHandler = async (request, result) => {
    log(`POST /coffeeStores`);
    const requestBody = request.body as CreateCoffeeStoresRequestBody;
    const coffeeStoresEntity = CoffeeStoreEntity.create({ ...requestBody });

    try {
        await CoffeeStoreEntity.save(coffeeStoresEntity);
        result.location(`/coffeeStores/${coffeeStoresEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

// DELETE /:id

type DeleteCoffeeStoresByIdRequestParams = WithId;

export const deleteCoffeeStoreById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCoffeeStoresByIdRequestParams;
    log(`DELETE /coffeeStores/:id (id = ${id})`);
    const coffeeStoresEntity = await CoffeeStoreEntity.findOne({ where: { id } });

    if (coffeeStoresEntity !== undefined) {
        await CoffeeStoreEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// PUT /:id

type UpdateCoffeeStoreByIdRequestParams = {
    id: number;
};
type UpdateCoffeeStoreByIdRequestBody = CoffeeStoreDto;

export const updateCoffeeStoreById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as UpdateCoffeeStoreByIdRequestParams;
    const requestBody = request.body as UpdateCoffeeStoreByIdRequestBody;
    log(`PUT /coffeeStores/${id}/`);

    const coffeeStoreEntity = await CoffeeStoreEntity.findOne({ where: { id } });

    if (coffeeStoreEntity !== undefined) {
        CoffeeStoreEntity.merge(coffeeStoreEntity, { ...requestBody });
        await CoffeeStoreEntity.save(coffeeStoreEntity);
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

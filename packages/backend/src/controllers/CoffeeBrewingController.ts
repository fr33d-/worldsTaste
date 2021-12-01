import { RequestHandler } from "express";
import * as httpStatusCodes from "http-status-codes";
import { CoffeeBrewingDto } from "../models/dtos/CoffeeBrewingDto";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { CoffeeBrewingEntity } from "../models/entities/CoffeeBrewingEntity";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";
import { createLogger } from "../utils/LoggerUtil";
import { Omit } from "../utils/TypeScriptUtils";

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

const log = createLogger("api:controllers:coffeeBrewing");

// GET /:id
type GetBrewingByIdRequestParams = WithId;

export const getCoffeeBrewings: RequestHandler = async (request, result) => {
    const requestParams = (request.params as unknown) as GetBrewingByIdRequestParams;
    log(`GET /coffee/:id/brewings/ (id = ${requestParams.id})`);

    const coffeeBrewingEntity = await CoffeeBrewingEntity.find({
        where: { coffee: { id: requestParams.id } },
    });

    if (coffeeBrewingEntity !== undefined) {
        log(coffeeBrewingEntity);
        result.status(httpStatusCodes.OK).json(coffeeBrewingEntity.map((entity) => new CoffeeBrewingDto(entity)));
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// POST /
type PostCoffeeBrewingByIdRequestParams = WithId;
type CreateCoffeeBrewingRequestBody = Omit<CoffeeBrewingDto, "id">;

export const createCoffeeBrewing: RequestHandler = async (request, result) => {
    log(`POST /coffee/id/brewing`);
    log(request.body);
    const { id } = (request.params as unknown) as PostCoffeeBrewingByIdRequestParams;
    const requestBody = request.body as CreateCoffeeBrewingRequestBody;
    const coffeeEntity = await CoffeeEntity.findOne({ where: { id }, relations: ["brewings"] });

    if (coffeeEntity === undefined) {
        result.sendStatus(httpStatusCodes.CONFLICT);
        return;
    }

    try {
        const coffeeBrewingEntity = CoffeeBrewingEntity.create({ ...requestBody });
        await CoffeeBrewingEntity.save(coffeeBrewingEntity);

        coffeeEntity.brewings = [coffeeBrewingEntity, ...coffeeEntity.brewings];
        log("Got new brewing for coffee:");
        log(coffeeEntity);

        await CoffeeEntity.save(coffeeEntity);
        log("coffee Brewing saved");
        result.location(`/brewings/${coffeeBrewingEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log("error");
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCoffeeBrewingByIdRequestParams = {
    id: number;
    brewId: number;
};

export const deleteCoffeeBrewingById: RequestHandler = async (request, result) => {
    const { brewId } = (request.params as unknown) as DeleteCoffeeBrewingByIdRequestParams;
    log(`DELETE /coffeeBrewing/:id (id = ${brewId})`);
    const coffeeBrewingEntity = await CoffeeBrewingEntity.findOne({ where: { brewId } });

    if (coffeeBrewingEntity !== undefined) {
        await CoffeeBrewingEntity.delete({ id: brewId });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// PUT /:id

type UpdateCoffeeBrewingByIdRequestParams = {
    id: number;
    brewId: number;
};
type UpdateCoffeeBrewingByIdRequestBody = CoffeeBrewingDto;

export const updateCoffeeBrewingById: RequestHandler = async (request, result) => {
    const { id, brewId } = (request.params as unknown) as UpdateCoffeeBrewingByIdRequestParams;
    const requestBody = request.body as UpdateCoffeeBrewingByIdRequestBody;
    log(`PUT /coffee/${id}/brewing/:${brewId}`);

    const coffeeBrewingEntity = await CoffeeBrewingEntity.findOne({ where: { brewId } });

    if (coffeeBrewingEntity !== undefined) {
        CoffeeBrewingEntity.merge(coffeeBrewingEntity, { ...requestBody });
        await CoffeeBrewingEntity.save(coffeeBrewingEntity);
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

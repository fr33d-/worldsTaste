import { RequestHandler } from "express";
import * as httpStatusCodes from "http-status-codes";
import { CoffeeDto } from "../models/dtos/CoffeeDto";
import { CoffeeEntity } from "../models/entities/CoffeeEntity";

export const exportCoffee: RequestHandler = async (_, result) => {
    console.log(`export /coffee`);

    const coffeeEntities = await CoffeeEntity.find({
        relations: ["brewings", "roaster"],
    });

    const coffeeDtos = coffeeEntities.map((coffeeEntity) => {
        coffeeEntity.images = coffeeEntity.images.length > 0 !== undefined ? [coffeeEntity.images[0]] : [];
        return CoffeeDto.fromEntity(coffeeEntity);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(coffeeDtos);
};

export const exportCompleteCoffee: RequestHandler = async (_, result) => {
    console.log(`export complete /coffee`);

    const coffeeEntities = await CoffeeEntity.find({
        relations: ["images", "roaster", "brewings", "roaster.images"],
    });

    const coffeeDtos = coffeeEntities?.map((coffeeEntity) => {
        coffeeEntity.images = coffeeEntity.images.length > 0 !== undefined ? [coffeeEntity.images[0]] : [];
        return CoffeeDto.fromEntity(coffeeEntity);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(coffeeDtos);
};

export const exportSimpleCoffee: RequestHandler = async (_, result) => {
    console.log(`export simple /coffee`);

    const coffeeEntities = await CoffeeEntity.find();

    const coffeeDtos = coffeeEntities?.map((coffeeEntity) => {
        return CoffeeDto.fromEntity(coffeeEntity);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(coffeeDtos);
};

import { RequestHandler } from "express";
import * as httpStatusCodes from "http-status-codes";
import { AppDataSource } from "../data-source";

export const deleteEverything: RequestHandler = async (req, res) => {
    try {
        // AppDataSource.getRepository(ImagesEntity).clear();
        // AppDataSource.getRepository(CoffeeBrewingEntity).clear();
        // AppDataSource.getRepository(CoffeeEntity).clear();
        // AppDataSource.getRepository(RoasterEntity).clear();

        await AppDataSource.query(`TRUNCATE TABLE "images_entity" CASCADE`);
        await AppDataSource.query(`TRUNCATE TABLE "coffee_brewing_entity" CASCADE`);
        await AppDataSource.query(`TRUNCATE TABLE "coffee_entity" CASCADE`);
        await AppDataSource.query(`TRUNCATE TABLE "roaster_entity" CASCADE`);

        res.sendStatus(httpStatusCodes.StatusCodes.OK);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Fehler" });
    }
};

import { Router } from 'express';
import {
    createCoffee,
    deleteCoffeeById,
    getAllCoffees,
    getCoffeeById,
    updateCoffeeById,
    getCoffeesAssets
} from '../controllers/CoffeeController';
import express from 'express';
import * as path from "path";

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeRoute = Router();

coffeeRoute.use('/static', express.static(path.join(__dirname, '../uploads/')));
coffeeRoute.route('/').get(getAllCoffees);
coffeeRoute.route('/').post(createCoffee);
coffeeRoute.route('/:id').get(getCoffeeById);
coffeeRoute.route('/:id').delete(deleteCoffeeById);
coffeeRoute.route('/assets/:id').get(getCoffeesAssets);

coffeeRoute.route('/:id').put(updateCoffeeById);
// coffeeRoute.route('/:id').put(uploadImage);

export { coffeeRoute };

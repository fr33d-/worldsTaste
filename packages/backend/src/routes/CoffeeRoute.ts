import express, { Router } from 'express';
import * as path from 'path';
import {
    createCoffee,
    deleteCoffeeById,
    deleteCoffeeImageByURL,
    getAllCoffees,
    getCoffeeById,
    getCoffeesAssets,
    postCoffeesAssets,
    updateCoffeeById,
} from '../controllers/CoffeeController';

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeRoute = Router();

coffeeRoute.route('/').get(getAllCoffees);
coffeeRoute.route('/').post(createCoffee);
coffeeRoute.route('/:id').get(getCoffeeById);
coffeeRoute.route('/:id').delete(deleteCoffeeById);
coffeeRoute.use('/assets', express.static(path.join(__dirname, '../../uploads/coffee-images')));
coffeeRoute.route('/assets/').get(getCoffeesAssets);
coffeeRoute.route('/assets/:id').post(postCoffeesAssets);
coffeeRoute.route('/assets/:id').delete(deleteCoffeeImageByURL);
// coffeeRoute.route('/assets/:id').delete(deleteCoffeesAssets);

coffeeRoute.route('/:id').put(updateCoffeeById);
// coffeeRoute.route('/:id').put(uploadImage);

export { coffeeRoute };

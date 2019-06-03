import { Router } from 'express';
import {
    createCoffee,
    deleteCoffeeById,
    getAllCoffees,
    getCoffeeById,
    updateCoffeeById,
} from '../controllers/CoffeeController';

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeRoute = Router();

coffeeRoute.route('/').get(getAllCoffees);
coffeeRoute.route('/').post(createCoffee);
coffeeRoute.route('/:id').get(getCoffeeById);
coffeeRoute.route('/:id').delete(deleteCoffeeById);
coffeeRoute.route('/:id').put(updateCoffeeById);

export { coffeeRoute };

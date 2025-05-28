import { Router } from "express";
import { getAllBrewings } from "../controllers/CoffeeBrewingController";
// import {
//     createCoffeeBrewing,
//     deleteCoffeeBrewingById,
//     getCoffeeBrewingById,
//     updateCoffeeBrewingById,
// } from '../controllers/CoffeeBrewingController';

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeBrewingRoute = Router();

// coffeeBrewingRoute.route('/').post(createCoffeeBrewing);
coffeeBrewingRoute.route("/").get(getAllBrewings);
// coffeeBrewingRoute.route('/:id').get(getCoffeeBrewingById);
// coffeeBrewingRoute.route('/:id').delete(deleteCoffeeBrewingById);
// coffeeBrewingRoute.route('/:id').put(updateCoffeeBrewingById);

export { coffeeBrewingRoute };

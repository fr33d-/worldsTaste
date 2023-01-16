import express, { Router } from "express";
import * as path from "path";
import {
    createCoffeeBrewing,
    deleteCoffeeBrewingById,
    getCoffeeBrewings,
    updateCoffeeBrewingById,
} from "../controllers/CoffeeBrewingController";
import {
    createCoffee,
    deleteCoffeeById,
    deleteCoffeeImageByURL,
    getAllCoffees,
    getCoffeeById,
    postCoffeesAssets,
    updateCoffeeById,
} from "../controllers/CoffeeController";
import {
    getCoffeeStores,
    createCoffeeStore,
    deleteCoffeeStoreById,
    updateCoffeeStoreById,
} from "../controllers/CoffeeAttrsController";

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeRoute = Router();

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

coffeeRoute.route("/").get(getAllCoffees);
// coffeeRoute.route('/').post(createCoffee);
coffeeRoute.post("/", [checkJwt, checkRole(["ADMIN", "USER"])], createCoffee);
coffeeRoute.route("/:id").get(getCoffeeById);
// coffeeRoute.route('/:id').delete(deleteCoffeeById);
coffeeRoute.delete("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeById);
coffeeRoute.use("/assets", express.static(path.join(__dirname, "../../uploads/coffee-images")));
// coffeeRoute.route("/assets/:id").get(getCoffeesAssets);
coffeeRoute.route("/assets/:id").post(postCoffeesAssets);
// coffeeRoute.post("/assets/:id", [checkJwt, checkRole(["ADMIN"])], postCoffeesAssets);
coffeeRoute.route("/assets/:id").delete(deleteCoffeeImageByURL);
// coffeeRoute.delete("/assets/:id", [checkJwt, checkRole(["ADMIN"])], deleteCoffeeImageByURL);

coffeeRoute.route("/:id/brewings").get(getCoffeeBrewings);
// coffeeRoute.route('/:id/brewings').post(createCoffeeBrewing);
coffeeRoute.post("/:id/brewings", [checkJwt, checkRole(["ADMIN", "USER"])], createCoffeeBrewing);
// coffeeRoute.route('/:id/brewings/:brewId').put(updateCoffeeBrewingById);
coffeeRoute.put("/:id/brewings/:brewId", [checkJwt, checkRole(["ADMIN", "USER"])], updateCoffeeBrewingById);
// coffeeRoute.route('/:id/brewings/:brewId').delete(deleteCoffeeBrewingById);
coffeeRoute.delete("/:id/brewings/:brewId", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeBrewingById);

coffeeRoute.route("/:id").put(updateCoffeeById);
// coffeeRoute.route('/:id').put(uploadImage);

coffeeRoute.route("/stores").get(getCoffeeStores);
// coffeeRoute.route('/stores').post(createCoffeeStore);
coffeeRoute.post("/stores", [checkJwt, checkRole(["ADMIN", "USER"])], createCoffeeStore);
// coffeeRoute.route('/stores/:id').put(updateCoffeeStoreById);
coffeeRoute.put("/stores/:id", [checkJwt, checkRole(["ADMIN", "USER"])], updateCoffeeStoreById);
// coffeeRoute.route('/stores/:id').delete(deleteCoffeeStoreById);
coffeeRoute.delete("/stores/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeStoreById);

export { coffeeRoute };

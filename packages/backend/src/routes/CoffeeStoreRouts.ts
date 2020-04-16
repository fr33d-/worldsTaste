import { Router } from "express";
import {
    getCoffeeStores,
    createCoffeeStore,
    updateCoffeeStoreById,
    deleteCoffeeStoreById,
} from "../controllers/CoffeeAttrsController";

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeStoresRoute = Router();

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

coffeeStoresRoute.route("/").get(getCoffeeStores);
coffeeStoresRoute.post("/", [checkJwt, checkRole(["ADMIN", "USER"])], createCoffeeStore);
coffeeStoresRoute.put("/", [checkJwt, checkRole(["ADMIN", "USER"])], updateCoffeeStoreById);
coffeeStoresRoute.delete("/", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeStoreById);

export { coffeeStoresRoute };

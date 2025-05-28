import express, { Router } from "express";
import * as path from "path";
import {
    createCoffeeBrewing,
    deleteCoffeeBrewingById,
    deleteExtractionImageByURL,
    getCoffeeBrewings,
    postExtractionAssets,
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

// Define a new router that basically wraps multiple endpoint into a single object.
const coffeeRoute = Router();

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

coffeeRoute.route("/").get(getAllCoffees);
coffeeRoute.route("/:id").get(getCoffeeById);
coffeeRoute.put("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], updateCoffeeById);
// coffeeRoute.route("/:id").put(updateCoffeeById);
coffeeRoute.post("/", [checkJwt, checkRole(["ADMIN", "USER"])], createCoffee);
coffeeRoute.delete("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeById);

coffeeRoute.use("/assets", express.static(path.join(__dirname, "../../uploads/coffee-images"))); // might not be needed
coffeeRoute.post("/assets/:id", [checkJwt, checkRole(["ADMIN", "USER"])], postCoffeesAssets);
coffeeRoute.delete("/assets/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeImageByURL); // All asset deletions

coffeeRoute.route("/:id/brewings").get(getCoffeeBrewings);
coffeeRoute.post("/:id/brewings", [checkJwt, checkRole(["ADMIN", "USER"])], createCoffeeBrewing);
coffeeRoute.put("/:id/brewings/:brewId", [checkJwt, checkRole(["ADMIN", "USER"])], updateCoffeeBrewingById);
coffeeRoute.delete("/:id/brewings/:brewId", [checkJwt, checkRole(["ADMIN", "USER"])], deleteCoffeeBrewingById);
// coffeeRoute.route("/:id/brewings/:brewId/assets/").post(postExtractionAssets);
coffeeRoute.post("/:id/brewings/:brewId/assets", [checkJwt, checkRole(["ADMIN", "USER"])], postExtractionAssets);
coffeeRoute.delete(
    "/:id/brewings/:brewId/assets/:imgId",
    [checkJwt, checkRole(["ADMIN", "USER"])],
    deleteExtractionImageByURL
);

// coffeeRoute.post("/jsonImport", [checkJwt, checkRole(["ADMIN", "USER"])], uploadCoffeeJson);

// coffeeRoute.route("/stores").get(getAllPosts);
// coffeeRoute.route("/stores/:id").get(getPostById);
// coffeeRoute.put("/stores/:id", [checkJwt, checkRole(["ADMIN", "USER"])], updatePostById);
// coffeeRoute.post("/stores", [checkJwt, checkRole(["ADMIN", "USER"])], createPost);
// coffeeRoute.delete("/stores/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deletePostById);
// coffeeRoute.post("/stores/:id/assets", [checkJwt, checkRole(["ADMIN", "USER"])], postPostAssets);

export { coffeeRoute };

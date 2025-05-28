import express, { Router } from "express";
import * as path from "path";
import {
    createRoaster,
    deleteRoasterById,
    deleteRoasterImageByURL,
    getAllRoaster,
    getRoasterById,
    postRoasterAssets,
    updateRoasterById,
} from "../controllers/RoasterController";

// Define a new router that basically wraps multiple endpoint into a single object.
const roasterRoute = Router();

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

roasterRoute.route("/").get(getAllRoaster);
roasterRoute.route("/:id").get(getRoasterById);
roasterRoute.put("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], updateRoasterById);

roasterRoute.post("/", [checkJwt, checkRole(["ADMIN", "USER"])], createRoaster);
roasterRoute.delete("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deleteRoasterById);

roasterRoute.use("/assets", express.static(path.join(__dirname, "../../uploads/roaster-images"))); // might not be needed
roasterRoute.post("/assets/:id", [checkJwt, checkRole(["ADMIN", "USER"])], postRoasterAssets);
roasterRoute.delete("/assets/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deleteRoasterImageByURL); // All asset deletions

export { roasterRoute };

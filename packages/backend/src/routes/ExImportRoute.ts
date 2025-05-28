import { Router } from "express";
import { deleteEverything } from "../controllers/DeleteAllControler";
import { exportCoffee, exportCompleteCoffee, exportSimpleCoffee } from "../controllers/ExportControler";
import { importNewCoffees } from "../controllers/ImportControllerForNewCoffees";
import { importOldCoffees } from "../controllers/ImportControllerForOldCoffees";

// Define a new router that basically wraps multiple endpoint into a single object.
const imexportRoute = Router();

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

imexportRoute.post("/old", [checkJwt, checkRole(["ADMIN"])], importOldCoffees);
imexportRoute.post("/new", [checkJwt, checkRole(["ADMIN"])], importNewCoffees);
imexportRoute.get("/", exportCoffee);
imexportRoute.get("/all", exportCompleteCoffee);
imexportRoute.get("/simple", exportSimpleCoffee);
imexportRoute.delete("/delete", [checkJwt, checkRole(["ADMIN"])], deleteEverything);

export { imexportRoute };

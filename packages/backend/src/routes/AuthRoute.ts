import { Router } from "express";
import { changePassword, login } from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const authRouter = Router();
//Login route
authRouter.post("/login", login);

//Change my password
authRouter.post("/change-password", [checkJwt, checkRole(["ADMIN", "USER"])], changePassword);

export { authRouter };

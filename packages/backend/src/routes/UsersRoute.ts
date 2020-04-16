import { Router } from "express";
// import {
// createUser,
// deleteUserById,
// getAllUsers,
// getUserById,
// updateUserById,
// } from "../controllers/UsersController-old";
import { deleteUser, editUser, getOneById, listAll, newUser } from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

// Define a new router that basically wraps multiple endpoint into a single object.
const usersRoute = Router();

// von christian
// usersRoute.route("/").get(getAllUsers);
// usersRoute.route("/").post(createUser);
// usersRoute.route("/:id").get(getUserById);
// usersRoute.route("/:id").delete(deleteUserById);
// usersRoute.route("/:id").put(updateUserById);

// von tutorial
//Get all users
usersRoute.get("/", [checkJwt, checkRole(["ADMIN", "USER"])], listAll);

// Get one user
usersRoute.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN", "USER"])], getOneById);

//Create a new user
usersRoute.post("/", [checkJwt, checkRole(["ADMIN"])], newUser);

//Edit one user
usersRoute.patch("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], editUser);

//Delete one user
usersRoute.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], deleteUser);

export { usersRoute };

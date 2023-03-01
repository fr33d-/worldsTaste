import { Router } from "express";
import {
    createPost,
    deletePostById,
    getAllPosts,
    getPostById,
    updatePostById,
} from "../controllers/BlogPostController";

// Define a new router that basically wraps multiple endpoint into a single object.
const postRoute = Router();

import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

postRoute.route("/").get(getAllPosts);
postRoute.post("/", [checkJwt, checkRole(["ADMIN", "USER"])], createPost);
postRoute.route("/:id").get(getPostById);
postRoute.delete("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], deletePostById);
postRoute.route("/:id").put(updatePostById);

export { postRoute };

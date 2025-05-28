import { Router } from "express";
import {
    createPost,
    deletePostById,
    deletePostImage,
    getAllPosts,
    getPostById,
    postPostAssets,
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
postRoute.put("/:id", [checkJwt, checkRole(["ADMIN", "USER"])], updatePostById);
// postRoute.route("/:id").put(updatePostById);

postRoute.post("/:id/assets", [checkJwt, checkRole(["ADMIN", "USER"])], postPostAssets);
postRoute.delete("/:postId/assets/:imageId", [checkJwt, checkRole(["ADMIN", "USER"])], deletePostImage);

export { postRoute };

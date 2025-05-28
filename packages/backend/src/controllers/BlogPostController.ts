import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as httpStatusCodes from "http-status-codes";
import sharp from "sharp";
import { BlogPostDto } from "../models/dtos/BlogPostDto";
import { ImageDto } from "../models/dtos/ImageDto";
import { BlogPostEntity } from "../models/entities/BlogPostEntity";
import { ImagesEntity } from "../models/entities/ImageEntry";
import { createLogger } from "../utils/LoggerUtil";

type WithId = {
    id: number;
};

const log = createLogger("api:controllers:coffee");

// GET /
export const getAllPosts: RequestHandler = async (_, result) => {
    log(`GET /post`);

    const postEntities = await BlogPostEntity.find({
        relations: ["images", "owner"],
    });

    const postDtos = postEntities.map((entry) => {
        const obj = BlogPostDto.fromEntity(entry);
        if (obj.images && obj.images.length >= 0) {
            return { ...obj, images: [obj.images[0]] };
        } else return obj;
        // return BlogPostDto.fromEntity(entry);
    });

    result.status(httpStatusCodes.StatusCodes.OK).json(postDtos);
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getPostById: RequestHandler = async (request, result) => {
    const requestParams = request.params as unknown as GetUserByIdRequestParams;

    log(`GET /post/:id (id = ${requestParams.id})`);

    const postEntity = await BlogPostEntity.findOne({
        where: { id: requestParams.id },
        relations: ["images", "owner"],
    });

    if (postEntity) {
        result.status(httpStatusCodes.StatusCodes.OK).json(new BlogPostDto(postEntity));
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// POST /
type CreatePostRequestBody = Omit<BlogPostDto, "id">;

export const createPost: RequestHandler = async (request, result) => {
    log(`POST /post`);
    log(request.body);
    const requestBody = request.body as CreatePostRequestBody;
    // log("post save called");
    const postEntity = BlogPostEntity.create({ ...requestBody });

    try {
        await BlogPostEntity.save(postEntity);
        log("post saved");
        result.location(`/posts/${postEntity.id}`).sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log("error");
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeletePostByIdRequestParams = WithId;

export const deletePostById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeletePostByIdRequestParams;
    log(`DELETE /post/:id (id = ${id})`);
    const postEntity = await BlogPostEntity.findOne({ where: { id } });

    if (postEntity) {
        await BlogPostEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

// PUT /:id
type UpdatePostByIdRequestParams = WithId;
type UpdatePostByIdRequestBody = BlogPostDto;

export const updatePostById: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as UpdatePostByIdRequestParams;
    console.log(`PUT /posts/:id (id = ${id})`);
    const requestBody = request.body as UpdatePostByIdRequestBody;
    const postEntity = await BlogPostEntity.findOne({ where: { id } });

    if (postEntity) {
        if (postEntity.id !== requestBody.id) {
            log(postEntity.id);
            log(requestBody);
            log(id);
            log(postEntity.id !== requestBody.id);
            console.log("cant save");
            result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        } else {
            BlogPostEntity.merge(postEntity, { ...requestBody });
            await BlogPostEntity.save(postEntity);
            console.log("saved with id", requestBody);
            result.sendStatus(httpStatusCodes.StatusCodes.OK);
        }
    } else {
        console.log("post not found");
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Post Assets
type PostCoffeeRequestParams = WithId;

export const postPostAssets: RequestHandler = async (request, result) => {
    console.log("Posting new post assets");
    if (request.files === undefined) {
        console.log("No images uploaded!");
        result.sendStatus(httpStatusCodes.StatusCodes.UNPROCESSABLE_ENTITY);
        return;
    }

    const { id } = request.params as unknown as PostCoffeeRequestParams;
    const uploadImage = request?.files?.images as UploadedFile;

    if (!uploadImage || !uploadImage.data || !uploadImage.name) {
        console.log("error, wrong file or no image given");
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }

    const postEntity = await BlogPostEntity.findOne({
        where: { id },
        relations: ["images"],
    });
    if (!postEntity) {
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        return;
    }

    const { data, name } = uploadImage;

    // resize
    const resizsedData = await sharp(data).resize(1200).toBuffer();

    try {
        const imageEntity = ImagesEntity.create({
            name: name,
            alt: name,
            description: name,
            file: Buffer.from(resizsedData).toString("base64"),
            post: postEntity,
        });
        await ImagesEntity.save(imageEntity);

        postEntity.images = [imageEntity, ...postEntity.images];
        console.log("Got new image for coffee:");

        await BlogPostEntity.save(postEntity);
        console.log("coffee saved");
        result.status(httpStatusCodes.StatusCodes.CREATED).send(new ImageDto(imageEntity));
    } catch (error) {
        console.log("error");
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }

    // result.sendStatus(httpStatusCodes.CREATED);
};

// DELETE Asset /:id
type DeletePostImageByIdRequestParams = { imageId: number; postId: number };

export const deletePostImage: RequestHandler = async (request, result) => {
    console.log("Delete post image by url");

    const { imageId, postId } = request.params as unknown as DeletePostImageByIdRequestParams;

    const postEntity = await BlogPostEntity.findOne({
        where: { id: postId },
        relations: ["images"],
    });
    if (!postEntity) {
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        console.log("cant find post wiht id", postId);
        return;
    }

    try {
        postEntity.images = postEntity.images.filter((cur) => cur.id != imageId);
        await BlogPostEntity.save(postEntity);
        console.log("Deleted image from post");
    } catch {
        console.log("Cant deleted image from post");
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
        return;
    }

    console.log(`DELETE image :id (id = ${imageId})`);
    const imageEntity = await ImagesEntity.findOne({ where: { id: imageId } });

    if (imageEntity !== undefined) {
        await ImagesEntity.delete({ id: imageId });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }

    //   result.sendStatus(httpStatusCodes.StatusCodes.OK);
};

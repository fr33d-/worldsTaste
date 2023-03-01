import { RequestHandler } from "express";
import * as httpStatusCodes from "http-status-codes";
import { BlogPostDto } from "../models/dtos/BlogPostDto";
import { BlogPostEntity } from "../models/entities/BlogPostEntity";
import { createLogger } from "../utils/LoggerUtil";

type WithId = {
    id: number;
};

const log = createLogger("api:controllers:coffee");

// GET /
export const getAllPosts: RequestHandler = async (_, result) => {
    log(`GET /post`);

    const postEntities = await BlogPostEntity.find({
        relations: ["image", "owner"],
    });

    const postDtos = postEntities.map((coffeeEntity) => {
        // coffeeEntity.image = coffeeEntity.image.length > 0 !== undefined ? [coffeeEntity.images[0]] : [];
        return BlogPostDto.fromEntity(coffeeEntity);
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
        relations: ["image", "owner"],
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
    log(`PUT /post/:id (id = ${id})`);
    const requestBody = request.body as UpdatePostByIdRequestBody;
    const coffeeEntity = await BlogPostEntity.findOne({ where: { id } });

    if (coffeeEntity) {
        if (coffeeEntity.id !== requestBody.id) {
            log(coffeeEntity.id);
            log(requestBody);
            log(id);
            log(coffeeEntity.id !== requestBody.id);
            result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
        } else {
            BlogPostEntity.merge(coffeeEntity, { ...requestBody });
            await BlogPostEntity.save(coffeeEntity);
            result.sendStatus(httpStatusCodes.StatusCodes.OK);
        }
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

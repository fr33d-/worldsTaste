import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";
import * as httpStatusCodes from "http-status-codes";
import * as path from "path";
import uniqid from "uniqid";
import { CigarDto } from "../models/dtos/CigarDto";
import { CigarEntity } from "../models/entities/CigarEntity";
import { createLogger } from "../utils/LoggerUtil";
import { Omit } from "../utils/TypeScriptUtils";

type WithId = {
    id: number;
};

const log = createLogger("api:controllers:cigars");

// GET /
export const getAllCigars: RequestHandler = async (_, result) => {
    log(`GET /cigars`);

    const cigarEntities = await CigarEntity.find({
        relations: ["anschnitt", "aromarad", "deckblatt", "einlage", "origin", "producer", "umblatt"],
    });
    // result.status(httpStatusCodes.OK).json(cigarEntities.map(CigarDto.fromEntity));

    //Append images
    const uploadsFolder = path.join(__dirname, "../../uploads/cigar-images");
    const cigarDtos = cigarEntities.map((cigarEntity) => {
        const cigarDto = CigarDto.fromEntity(cigarEntity);

        const imagePath = path.join(uploadsFolder, String(cigarEntity.id));
        if (fs.existsSync(imagePath)) {
            const images = fs.readdirSync(imagePath).map((item) => `/cigars/assets/${cigarEntity.id}/${item}`);
            cigarDto.imageStrings = images;
        }
        return cigarDto;
    });

    result.status(httpStatusCodes.OK).json(cigarDtos);
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCigarById: RequestHandler = async (request, result) => {
    const requestParams = (request.params as unknown) as GetUserByIdRequestParams;

    log(`GET /cigar/:id (id = ${requestParams.id})`);

    const cigarEntity = await CigarEntity.findOne({
        where: { id: requestParams.id },
        relations: ["anschnitt", "aromarad", "deckblatt", "einlage", "origin", "producer", "umblatt"],
    });

    if (cigarEntity !== undefined) {
        result.status(httpStatusCodes.OK).json(new CigarDto(cigarEntity));
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// POST /
type CreateCigarRequestBody = Omit<CigarDto, "id">;

export const createCigar: RequestHandler = async (request, result) => {
    log(`POST /cigar`);
    log(request.body);
    const requestBody = request.body as CreateCigarRequestBody;
    const coffeeEntity = CigarEntity.create({ ...requestBody });

    try {
        await CigarEntity.save(coffeeEntity);
        log("cigar saved");
        result.location(`/users/${coffeeEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log("error");
        log("saving error");
        log(requestBody);
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCigarByIdRequestParams = WithId;

export const deleteCigarById: RequestHandler = async (request, result) => {
    const { id } = (request.params as unknown) as DeleteCigarByIdRequestParams;
    log(`DELETE /cigar/:id (id = ${id})`);
    const cigarEntity = await CigarEntity.findOne({ where: { id } });

    if (cigarEntity !== undefined) {
        await CigarEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// PUT /:id
type UpdateCigarByIdRequestParams = WithId;
type UpdateCigarByIdRequestBody = CigarDto;

export const updateCigarById: RequestHandler = async (request, result) => {
    const { id } = (request.params as unknown) as UpdateCigarByIdRequestParams;
    log(`PUT /cigar/:id (id = ${id})`);
    const requestBody = request.body as UpdateCigarByIdRequestBody;
    const cigarEntity = await CigarEntity.findOne({ where: { id } });

    if (cigarEntity !== undefined) {
        if (cigarEntity.id !== requestBody.id) {
            result.sendStatus(httpStatusCodes.CONFLICT);
        } else {
            CigarEntity.merge(cigarEntity, { ...requestBody });
            await CigarEntity.save(cigarEntity);
            result.sendStatus(httpStatusCodes.OK);
        }
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

//GET Assets

export const getCigarAssets: RequestHandler = async (request, result) => {
    const cigarId = request.params.id;
    const uploadsFolder = path.join(__dirname, "../../uploads/cigar-images");
    const cigarImages = path.join(uploadsFolder, cigarId);
    if (!fs.existsSync(cigarImages)) {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
        return;
    }

    const files = fs.readdirSync(cigarImages);
    result.status(httpStatusCodes.OK).send(files.map((item) => `/coffee/assets/${cigarId}/${item}`));
};

//Post Assets
type PostCigarRequestParams = WithId;

export const postCigarAssets: RequestHandler = async (request, result) => {
    log("Posting new cigar assets");
    if (request.files === undefined) {
        log("No images uploaded!");
        result.sendStatus(httpStatusCodes.UNPROCESSABLE_ENTITY);
        return;
    }

    const { id } = (request.params as unknown) as PostCigarRequestParams;
    const images = request?.files?.images as UploadedFile[];
    const imagesArray = Array.isArray(images) ? images : [images];
    const imageStrings = [];

    for (const file of imagesArray) {
        log("New asset");
        const targetPath = `./uploads/cigar-images/${id}`;
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
        }
        const fileName = `${targetPath}/${uniqid()}.${file.name.split(".").slice(-1)[0]}`;
        await file.mv(fileName);
        imageStrings.push(fileName);
    }

    result.location(String(imageStrings)).sendStatus(httpStatusCodes.OK);
};

// DELETE Asset /:id
type DeleteCigarImageByIdRequestParams = { id: number };
type DeleteCigarImageByIdRequestBody = { url: string };

export const deleteCigarImageByURL: RequestHandler = async (request, result) => {
    log("Delete coffee by url");

    const { id } = (request.params as unknown) as DeleteCigarImageByIdRequestParams;
    const { url } = request.body as DeleteCigarImageByIdRequestBody;

    const fileName = url.split("/").slice(-1)[0];
    const targetPath = `./uploads/cigar-images/${id}`;

    // log(targetPath + '/' + fileName);

    try {
        fs.unlinkSync(`${targetPath}/${fileName}`);
    } catch (err) {
        log(err);
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }

    result.sendStatus(httpStatusCodes.OK);
};

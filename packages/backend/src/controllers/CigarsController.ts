import { RequestHandler } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { CigarDto } from '../models/dtos/CigarDto';
import { CigarEntity } from '../models/entities/CigarEntity';
import { createLogger } from '../utils/LoggerUtil';
import { Omit } from '../utils/TypeScriptUtils';
import fileUpload, { UploadedFile } from 'express-fileupload';
import * as path from "path";
import * as fs from "fs";

type WithId = {
    id: number;
};

const log = createLogger('api:controllers:cigars');

// GET /
export const getAllCigars: RequestHandler = async (_, result) => {
    log(`GET /cigars`);

    const cigarEntities = await CigarEntity.find({
        relations: ['anschnitt', 'aromarad', 'deckplatt', 'einlage', 'origin', 'producer', 'umblatt'],
    });
    result.status(httpStatusCodes.OK).json(cigarEntities.map(CigarDto.fromEntity));
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCigarById: RequestHandler = async (request, result) => {
    const requestParams = request.params as GetUserByIdRequestParams;

    log(`GET /cigar/:id (id = ${requestParams.id})`);

    const cigarEntity = await CigarEntity.findOne({
        where: { id: requestParams.id },
        relations: ['anschnitt', 'aromarad', 'deckplatt', 'einlage', 'origin', 'producer', 'umblatt'],
    });

    if (cigarEntity !== undefined) {
        result.status(httpStatusCodes.OK).json(new CigarDto(cigarEntity));
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

// POST /
type CreateCigarRequestBody = Omit<CigarDto, 'id'>;

export const createCigar: RequestHandler = async (request, result) => {
    log(`POST /cigar`);
    log(request.body);
    const requestBody = request.body as CreateCigarRequestBody;
    const coffeeEntity = CigarEntity.create({ ...requestBody });

    try {
        await CigarEntity.save(coffeeEntity);
        log('cigar saved');
        result.location(`/users/${coffeeEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    } catch (error) {
        log('error');
        log(error);
        result.sendStatus(httpStatusCodes.CONFLICT);
    }
};

// DELETE /:id
type DeleteCigarByIdRequestParams = WithId;

export const deleteCigarById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCigarByIdRequestParams;
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
    const { id } = request.params as UpdateCigarByIdRequestParams;
    log(`PUT /cigar/:id (id = ${id})`);
    const requestBody = request.body as UpdateCigarByIdRequestBody;
    const cigarEntity = await CigarEntity.findOne({ where: { id } });

    if (cigarEntity !== undefined) {
        if (request.files !== undefined) {
            await (request.files.images as UploadedFile[]).forEach(async (file) => {
                const targetPath = `./uploads/cigar-images/${request.params.id}`;
                if (!fs.existsSync(targetPath)) {
                    fs.mkdirSync(targetPath, { recursive: true });
                }
                await file.mv(`${targetPath}/${file.name}`);
            });
        }

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

export const getCigarAssets: RequestHandler = async (request, result) => {
    const cigarId = request.params.id;

    const uploadsFolder = path.join(__dirname, '../uploads/cigar-images');
    const cigarImages = path.join(uploadsFolder, cigarId);
    if (fs.existsSync(cigarImages)) {
        const files = fs.readdirSync(cigarImages);
        result.status(httpStatusCodes.OK).send(files.map((item) => `/static/cigar-images/${cigarId}/${item}`));
        return;
    }

    result.sendStatus(httpStatusCodes.NOT_FOUND);
};
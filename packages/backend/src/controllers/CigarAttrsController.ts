import { RequestHandler } from "express";
import * as httpStatusCodes from "http-status-codes";
import {
    CigarAnschnittDto,
    CigarAromaradDto,
    CigarDeckblattDto,
    CigarEinlageDto,
    CigarOriginDto,
    CigarProducerDto,
    CigarUmblattDto,
} from "../models/dtos/CigarAttrDto";
import {
    CigarAnschnittEntity,
    CigarAromaradEntity,
    CigarDeckblattEntity,
    CigarEinlageEntity,
    CigarOriginEntity,
    CigarProducerEntity,
    CigarUmblattEntity,
} from "../models/entities/CigarAttrsEntity";
import { createLogger } from "../utils/LoggerUtil";
import { Omit } from "../utils/TypeScriptUtils";

const log = createLogger("api:controllers:cigar");

type WithId = {
    id: number;
};

// CigarAnschnitt

export const getCigarAnschnittEntities: RequestHandler = async (_, result) => {
    log(`GET /coffee/anschnitt`);

    const cigarAnschnittEntity = await CigarAnschnittEntity.find();
    result.status(httpStatusCodes.OK).json(cigarAnschnittEntity.map(CigarAnschnittDto.fromEntity));
};

type CreateCigarAnschnittEntityRequestBody = Omit<CigarAnschnittDto, "id">;

export const createCigarAnschnittEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/anschnitt`);
    const requestBody = request.body as CreateCigarAnschnittEntityRequestBody;
    const cigarAnschnittEntity = CigarAnschnittEntity.create({ ...requestBody });

    try {
        await CigarAnschnittEntity.save(cigarAnschnittEntity);
        result
            .location(`/coffeeAttrs/anschnitt/${cigarAnschnittEntity.id}`)
            .sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarAnschnittEntityRequestBody = WithId;

export const deleteCigarAnschnittEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarAnschnittEntityRequestBody;
    log(`DELETE /cigarAttrs/anschnitt/:id (id = ${id})`);
    const cigarAnschnittEntity = await CigarAnschnittEntity.findOne({ where: { id } });

    if (cigarAnschnittEntity !== undefined) {
        await CigarAnschnittEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Aromarad

export const getCigarAromaradEntities: RequestHandler = async (_, result) => {
    log(`GET /coffee/aromarad`);

    const cigarAromaradEntity = await CigarAromaradEntity.find();
    result.status(httpStatusCodes.StatusCodes.OK).json(cigarAromaradEntity.map(CigarAromaradDto.fromEntity));
};

type CreateCigarAromaradEntityRequestBody = Omit<CigarAromaradDto, "id">;

export const createCigarAromaradEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/aromarad`);
    const requestBody = request.body as CreateCigarAromaradEntityRequestBody;
    const cigarAromaradEntity = CigarAromaradEntity.create({ ...requestBody });

    try {
        await CigarAromaradEntity.save(cigarAromaradEntity);
        result
            .location(`/coffeeAttrs/aromarad/${cigarAromaradEntity.id}`)
            .sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarAromaradEntityRequestBody = WithId;

export const deleteCigarAromaradEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarAromaradEntityRequestBody;
    log(`DELETE /cigarAttrs/aromarad/:id (id = ${id})`);
    const cigarAromaradEntity = await CigarAromaradEntity.findOne({ where: { id } });

    if (cigarAromaradEntity !== undefined) {
        await CigarAromaradEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Deckblatt

export const getCigarDeckblattEntities: RequestHandler = async (_, result) => {
    log(`GET /cigarAttrs/deckblatt`);

    const cigarDeckblattEntity = await CigarDeckblattEntity.find();
    result.status(httpStatusCodes.StatusCodes.OK).json(cigarDeckblattEntity.map(CigarDeckblattDto.fromEntity));
};

type CreateCigarDeckblattEntityRequestBody = Omit<CigarDeckblattDto, "id">;

export const createCigarDeckblattEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/deckblatt`);
    const requestBody = request.body as CreateCigarDeckblattEntityRequestBody;
    const cigarDeckblattEntity = CigarDeckblattEntity.create({ ...requestBody });

    try {
        await CigarDeckblattEntity.save(cigarDeckblattEntity);
        result
            .location(`/coffeeAttrs/deckblatt/${cigarDeckblattEntity.id}`)
            .sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarDeckblattEntityRequestBody = WithId;

export const deleteCigarDeckblattEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarDeckblattEntityRequestBody;
    log(`DELETE /cigarAttrs/deckblatt/:id (id = ${id})`);
    const cigarDeckblattEntity = await CigarDeckblattEntity.findOne({ where: { id } });

    if (cigarDeckblattEntity !== undefined) {
        await CigarDeckblattEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Einlagen

export const getCigarEinlageEntities: RequestHandler = async (_, result) => {
    log(`GET /coffee/anschnitt`);

    const cigarEinlageEntity = await CigarEinlageEntity.find();
    result.status(httpStatusCodes.StatusCodes.OK).json(cigarEinlageEntity.map(CigarEinlageDto.fromEntity));
};

type CreateCigarEinlageEntityRequestBody = Omit<CigarEinlageDto, "id">;

export const createCigarEinlageEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/einlage`);
    const requestBody = request.body as CreateCigarEinlageEntityRequestBody;
    const cigarEinlageEntity = CigarEinlageEntity.create({ ...requestBody });

    try {
        await CigarEinlageEntity.save(cigarEinlageEntity);
        result
            .location(`/coffeeAttrs/deckblatt/${cigarEinlageEntity.id}`)
            .sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarEinlageEntityRequestBody = WithId;

export const deleteCigarEinlageEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarEinlageEntityRequestBody;
    log(`DELETE /cigarAttrs/einlage/:id (id = ${id})`);
    const cigarEinlageEntity = await CigarEinlageEntity.findOne({ where: { id } });

    if (cigarEinlageEntity !== undefined) {
        await CigarEinlageEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Origins

export const getCigarOriginEntities: RequestHandler = async (_, result) => {
    log(`GET /coffee/anschnitt`);

    const cigarOriginEntity = await CigarOriginEntity.find();
    result.status(httpStatusCodes.StatusCodes.OK).json(cigarOriginEntity.map(CigarOriginDto.fromEntity));
};

type CreateCigarOriginEntityRequestBody = Omit<CigarOriginDto, "id">;

export const createCigarOriginEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/origin`);
    const requestBody = request.body as CreateCigarOriginEntityRequestBody;
    const cigarOriginEntity = CigarOriginEntity.create({ ...requestBody });

    try {
        await CigarOriginEntity.save(cigarOriginEntity);
        result.location(`/coffeeAttrs/origin/${cigarOriginEntity.id}`).sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarOriginEntityRequestBody = WithId;

export const deleteCigarOriginEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarOriginEntityRequestBody;
    log(`DELETE /cigarAttrs/origin/:id (id = ${id})`);
    const cigarOriginEntity = await CigarOriginEntity.findOne({ where: { id } });

    if (cigarOriginEntity !== undefined) {
        await CigarOriginEntity.delete({ id });
        result.sendStatus(httpStatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Producers

export const getCigarProducerEntities: RequestHandler = async (_, result) => {
    log(`GET /coffee/anschnitt`);

    const cigarProducerEntity = await CigarProducerEntity.find();
    result.status(httpStatusCodes.StatusCodes.OK).json(cigarProducerEntity.map(CigarProducerDto.fromEntity));
};

type CreateCigarProducerEntityRequestBody = Omit<CigarProducerDto, "id">;

export const createCigarProducerEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/producer`);
    const requestBody = request.body as CreateCigarProducerEntityRequestBody;
    const cigarProducerEntity = CigarProducerEntity.create({ ...requestBody });

    try {
        await CigarProducerEntity.save(cigarProducerEntity);
        result
            .location(`/coffeeAttrs/producer/${cigarProducerEntity.id}`)
            .sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarProducerEntityRequestBody = WithId;

export const deleteCigarProducerEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarProducerEntityRequestBody;
    log(`DELETE /cigarAttrs/producer/:id (id = ${id})`);
    const cigarProducerEntity = await CigarProducerEntity.findOne({ where: { id } });

    if (cigarProducerEntity !== undefined) {
        await CigarProducerEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

//Umblatt

export const getCigarUmblattEntities: RequestHandler = async (_, result) => {
    log(`GET /coffee/anschnitt`);

    const cigarUmblattEntity = await CigarUmblattEntity.find();
    result.status(httpStatusCodes.OK).json(cigarUmblattEntity.map(CigarUmblattDto.fromEntity));
};

type CreateCigarUmblattEntityRequestBody = Omit<CigarUmblattDto, "id">;

export const createCigarUmblattEntity: RequestHandler = async (request, result) => {
    log(`POST /cigarAttrs/umblatt`);
    const requestBody = request.body as CreateCigarUmblattEntityRequestBody;
    const cigarUmblattEntity = CigarUmblattEntity.create({ ...requestBody });

    try {
        await CigarUmblattEntity.save(cigarUmblattEntity);
        result
            .location(`/coffeeAttrs/umblatt/${cigarUmblattEntity.id}`)
            .sendStatus(httpStatusCodes.StatusCodes.CREATED);
    } catch (error) {
        log(error);
        result.sendStatus(httpStatusCodes.StatusCodes.CONFLICT);
    }
};

type DeleteCigarUmblattEntityRequestBody = WithId;

export const deleteCigarUmblattEntity: RequestHandler = async (request, result) => {
    const { id } = request.params as unknown as DeleteCigarUmblattEntityRequestBody;
    log(`DELETE /cigarAttrs/umblatt/:id (id = ${id})`);
    const cigarUmblattEntity = await CigarUmblattEntity.findOne({ where: { id } });

    if (cigarUmblattEntity !== undefined) {
        await CigarUmblattEntity.delete({ id });
        result.sendStatus(httpStatusCodes.StatusCodes.OK);
    } else {
        result.sendStatus(httpStatusCodes.StatusCodes.NOT_FOUND);
    }
};

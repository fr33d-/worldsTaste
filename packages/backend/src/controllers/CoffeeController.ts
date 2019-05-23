import { RequestHandler } from 'express';
import * as httpStatusCodes from 'http-status-codes';
import { UserDto } from '../models/dtos/UserDto';
import { UserEntity } from '../models/entities/UserEntity';
import { createLogger } from '../utils/LoggerUtil';
import { Omit } from '../utils/TypeScriptUtils';

// Small helper type to embed id paramters into custom types.
type WithId = {
    id: number;
};

const log = createLogger('api:controllers:users');

const oneCoffee = {
    id: 1,
    images: [
        {
            name: 'Test',
            url: 'http://placekitten.com/500/500',
            alt: 'cat',
        },
        {
            name: 'Test 2',
            url: 'http://placekitten.com/500/500',
            alt: 'another cat',
        },
    ],
    name: 'Test post',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  \
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    origin: 'Germany',
    rating: 5,
    kind: 'Light coffee',
    roasted: 'Kiel',
};

let exampleCoffee = [
    oneCoffee,
    {
        id: 2,
        images: [
            {
                name: 'Test',
                url: 'http://placekitten.com/500/500',
                alt: 'cat',
            },
            {
                name: 'Test 2',
                url: 'http://placekitten.com/500/500',
                alt: 'another cat',
            },
        ],
        name: 'Another test post',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  \
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo \
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse \
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non \
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        origin: 'Germany',
        rating: 5,
        kind: 'Light coffee',
        roasted: 'Kiel',
    },
];

type Coffee = typeof oneCoffee; 

// GET /
export const getAllCoffees: RequestHandler = async (_, result) => {
    log(`GET /coffee`);

    // const userEntities = await UserEntity.find();

    // result.status(httpStatusCodes.OK).json(userEntities.map(UserDto.fromEntity));
    result.status(httpStatusCodes.OK).json(exampleCoffee);
};

// GET /:id
type GetUserByIdRequestParams = WithId;

export const getCoffeeById: RequestHandler = async (request, result) => {
    const requestParams = request.params as GetUserByIdRequestParams;

    log(`GET /coffee/:id (id = ${requestParams.id})`);

    // const userEntity = await UserEntity.findOne({ where: { id: requestParams.id } });

    // if (userEntity !== undefined) {
    //     result.status(httpStatusCodes.OK).json(new UserDto(userEntity));
    // } else {
    //     result.sendStatus(httpStatusCodes.NOT_FOUND);
    // }

    result.status(httpStatusCodes.OK).json(exampleCoffee);
};

// POST /
type CreateUserRequestBody = Omit<UserDto, 'id'>;

export const createCoffee: RequestHandler = async (request, result) => {
    // log(`POST /coffee`);
    // const requestBody = request.body as CreateUserRequestBody;
    // const userEntity = UserEntity.create({ ...requestBody, password: 'super-secret' });

    // try {
    //     await UserEntity.save(userEntity);
    //     result.location(`/users/${userEntity.id}`).sendStatus(httpStatusCodes.CREATED);
    // } catch (error) {
    //     result.sendStatus(httpStatusCodes.CONFLICT);
    // }

    const newCoffee = request.body as Coffee;

    exampleCoffee.push(newCoffee);

    result.location(`/coffee/${newCoffee.id}`).sendStatus(httpStatusCodes.CREATED);
    
};

// DELETE /:id
type DeleteCoffeeByIdRequestParams = WithId;

export const deleteCoffeeById: RequestHandler = async (request, result) => {
    const { id } = request.params as DeleteCoffeeByIdRequestParams;
    log(`DELETE /coffee/:id (id = ${id})`);
    // const coffeeEntity = await CoffeeEntity.findOne({ where: { id } });
    exampleCoffee = exampleCoffee.filter(item => item.id !== Number(id));

    console.log(exampleCoffee);
    // if (coffeeEntity !== undefined) {
    //     await UserEntity.delete({ id });
    //     result.sendStatus(httpStatusCodes.OK);
    // } else {
    //     result.sendStatus(httpStatusCodes.NOT_FOUND);
    // }

    result.sendStatus(httpStatusCodes.OK);
};

// PUT /:id
type UpdateUserByIdRequestParams = WithId;
type UpdateUserByIdRequestBody = UserDto;

export const updateCoffeeById: RequestHandler = async (request, result) => {
    const { id } = request.params as UpdateUserByIdRequestParams;
    log(`PUT /users/:id (id = ${id})`);
    const requestBody = request.body as UpdateUserByIdRequestBody;
    const userEntity = await UserEntity.findOne({ where: { id } });

    if (userEntity !== undefined) {
        if (userEntity.id !== requestBody.id) {
            result.sendStatus(httpStatusCodes.CONFLICT);
        } else {
            UserEntity.merge(userEntity, { ...requestBody, password: 'updated-password' });
            await UserEntity.save(userEntity);
            result.sendStatus(httpStatusCodes.OK);
        }
    } else {
        result.sendStatus(httpStatusCodes.NOT_FOUND);
    }
};

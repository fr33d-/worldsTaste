import { validate } from "class-validator";
import { Request, RequestHandler, Response } from "express";
import { getRepository } from "typeorm";
import { UserEntity } from "../models/entities/UserEntity";

// class UserController {
// export const getAllCoffees: RequestHandler = async (_, result) => {
export const listAll: RequestHandler = async (_, res) => {
    //Get users from database
    const userRepository = getRepository(UserEntity);
    const users = await userRepository.find({
        select: ["id", "name", "email", "username", "role"], //We dont want to send the passwords on response
    });

    //Send the users object
    res.send(users);
};

export const getOneById: RequestHandler = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = Number(req.params.id);

    //Get the user from database
    const userRepository = getRepository(UserEntity);
    try {
        // const user = await userRepository.findOneOrFail(id, {
        //     select: ["id", "username", "role"], //We dont want to send the password on response
        // });
        const user = await userRepository.findOneOrFail({
            select: ["id", "username", "role"], //We dont want to send the password on response
        });
    } catch (error) {
        res.status(404).send("User not found");
    }

    // Todo? Müsste ich hier nicht die userliste verschicken?
};

export const newUser: RequestHandler = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password, role, email, name } = req.body;
    let user = new UserEntity();
    user.username = username;
    user.password = password;
    user.role = role;
    user.createdAt = new Date();
    user.email = email;
    user.name = name;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        console.log(errors);
        return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(UserEntity);
    try {
        const newUser = await userRepository.save(user);
        //If all ok, send 201 response
        res.status(201).location(`/user/${newUser.id}`).send("User created");
    } catch (e) {
        res.status(409).send("username already in use");
        console.log("username already in use", e);
        return;
    }
};

export const editUser: RequestHandler = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = Number(req.params.id);

    //Get values from the body
    const { username, role } = req.body;

    //Try to find user on database
    const userRepository = getRepository(UserEntity);
    let user;
    try {
        user = await userRepository.findOneOrFail({ select: ["id"] });
        // user = await userRepository.findOneOrFail(id);
    } catch (error) {
        //If not found, send a 404 response
        res.status(404).send("User not found");
        return;
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    //Try to safe, if fails, that means username already in use
    try {
        await userRepository.save(user);
    } catch (e) {
        res.status(409).send("username already in use");
        return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
        user = await userRepository.findOneOrFail({ select: ["id"] });
        // user = await userRepository.findOneOrFail(id);
    } catch (error) {
        res.status(404).send("User not found");
        return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
};

import { validate } from "class-validator";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import config from "../config";
import { UserEntity } from "../models/entities/UserEntity";

// class AuthController {
export const login = async (req: Request, res: Response) => {
    //Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
        console.log("Auth: 400");
        return;
    }

    //Get user from database
    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
        user = await userRepository.findOneOrFail({ where: { username } });

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            console.log("Auth: 401");
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username, name: user.name, email: user.email, role: user.role },
            config.jwtSecret,
            { expiresIn: "7d" }
        );

        //Send the jwt in the response
        console.log("Auth: ok");
        res.send(token);
    } catch (error) {
        console.log("Auth: 401");
        res.status(401).send();
    }
};

export const changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
        user = await userRepository.findOneOrFail(id);

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send();
            return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    } catch (id) {
        res.status(401).send();
    }
};
// }
// export default AuthController;

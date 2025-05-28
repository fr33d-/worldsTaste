import { NextFunction, Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { UserEntity } from "../models/entities/UserEntity";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        const userRepository = AppDataSource.getRepository(UserEntity);
        let user: UserEntity;

        try {
            // user = await userRepository.findOneOrFail(id);
            user = await userRepository.findOneOrFail({ where: { id } });

            // console.log("user: ", user.role, roles, typeof roles);
            //Check if array of authorized roles includes the user's role
            if (roles.includes(user.role)) {
                next();
            } else {
                res.status(401).send();
            }
            return;
        } catch (error) {
            // console.log("check roles but can not find user", id);
            console.log("pw", roles);
            res.status(401).send();
        }
    };
};

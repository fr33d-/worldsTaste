import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { UserEntity } from '../models/entities/UserEntity';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId;

        //Get user role from the database
        const userRepository = getRepository(UserEntity);
        let user: UserEntity;
        try {
            user = await userRepository.findOneOrFail(id);
            //Check if array of authorized roles includes the user's role
            if (roles.indexOf(user.role) > -1) {
                next();
            }
        } catch (id) {
            res.status(401).send();
        }

        res.status(401).send();
    };
};

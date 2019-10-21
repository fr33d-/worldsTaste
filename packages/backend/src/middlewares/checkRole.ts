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
            if (roles.includes(user.role)) {
                next();
            } else {
                res.status(401).send();
            }
            return;
        } catch (error) {
            res.status(401).send();
        }
    };
};

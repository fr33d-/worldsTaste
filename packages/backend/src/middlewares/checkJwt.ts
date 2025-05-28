import { log } from "debug";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers["auth"];
    let jwtPayload;

    //Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
        console.log("jwt is valid");
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        console.log("error checking jwt");
        console.log(error);
        log("error checking jwt", error);
        res.status(401).send();
        return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
        expiresIn: "1h",
    });
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
};

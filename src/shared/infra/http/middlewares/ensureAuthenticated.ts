import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request, 
    res: Response, 
    next: NextFunction) {

    const authHeader = req.headers.authorization;


    if(!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
       const { sub: user_id } = verify(
        token, 
        "98f866b99d77b194704c33788449f65c"
        ) as IPayload;

       const usersRepository = new UsersRepository();
       
       const user = usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exist!", 401);
        }

        req.user = {
            id: user_id,
        };

       next();
    } catch(err) {
        throw new AppError("invalid token!", 401);
    }
}
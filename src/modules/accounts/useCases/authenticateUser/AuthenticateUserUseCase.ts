import { injectable, inject } from "tsyringe";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import {AppError} from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}
    
    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError("Email or password incorrect!")
        }

        const passwordMatches = await compare(password, user.password)

        if(!passwordMatches) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, "98f866b99d77b194704c33788449f65c", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }
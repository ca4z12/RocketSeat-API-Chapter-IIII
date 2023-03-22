import { getRepository, Repository } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


class UsersRepository implements IUsersRepository {
    
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ 
        name, 
        password, 
        email, 
        driver_license,
        avatar,
        id, }: 
        ICreateUserDTO): Promise<void> {

            const user = this.repository.create({ 
                name, 
                password, 
                email, 
                driver_license,
                avatar,
                id,
            });

            await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ email });
        return user;
    }

    async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne(user_id);
        return user;
    }
}

export { UsersRepository };
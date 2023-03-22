import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory implements IUsersRepository {
    
    users: User[] = [];
    

    async create({ 
        name,
        password,
        email,
        driver_license,
     }: ICreateUserDTO): Promise<void> {

        const user = new User();

        Object.assign(user, {
            name,
            password,
            email,
            driver_license
        });

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(user_id: string): Promise<User> {
        return this.users.find(user => user.id === user_id);      
    }
}

export { UsersRepositoryInMemory }
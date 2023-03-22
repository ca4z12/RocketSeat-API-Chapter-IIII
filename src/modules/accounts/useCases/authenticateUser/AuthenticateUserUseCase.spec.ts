import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );

        createUserUseCase = new CreateUserUseCase(
            usersRepositoryInMemory
        );
    });


    it("Should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            name: "user test",
            password: "1234",
            email: "user@test.com",
            driver_license: "00123"
        };
        
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
    
        expect(result).toHaveProperty("token");
    });

    it("Shouldn't be able to authenticate an nonexisting user", () => {
        expect( async () => {
            await authenticateUserUseCase.execute({
                email: "false@gmail.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with incorrect password", () => {
        expect( async () => {

            const user: ICreateUserDTO = {
                name: "User test error",
                password: "1234",
                email: "user@user.com",
                driver_license: "9999"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "123",
            })

        }).rejects.toBeInstanceOf(AppError);
    })
});

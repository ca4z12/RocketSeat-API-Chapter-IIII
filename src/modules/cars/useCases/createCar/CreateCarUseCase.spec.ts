import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { describe } from "node:test";
import { CreateCarUseCase } from "./CreateCarUseCase";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Ford",
            description: "This is a car",
            brand: "brand",
            daily_rate: 100,
            fine_amount: 60,
            license_plate: "ABC-1234",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with the same license plate", () => {
        expect( async () => {
            await createCarUseCase.execute({
                name: "Ford",
                description: "This is a car",
                brand: "brand",
                daily_rate: 100,
                fine_amount: 60,
                license_plate: "ABC-1234",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Ford2",
                description: "This is a car",
                brand: "brand",
                daily_rate: 100,
                fine_amount: 60,
                license_plate: "ABC-1234",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Car's availability should be true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Ford",
            description: "This is a car",
            brand: "brand",
            daily_rate: 100,
            fine_amount: 60,
            license_plate: "ABC-1234",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });

}) 
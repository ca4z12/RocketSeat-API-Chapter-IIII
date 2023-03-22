import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;


describe("Create Car Specification", () => {


    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to an non-existing car", async () => {
        expect( async () => {
            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({ 
                car_id, 
                specifications_id
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
        name: "Ford",
        description: "This is a car",
        brand: "brand",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC-1234",
        category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "teste",
            name: "test",
        })

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({ 
            car_id: car.id, 
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1);
    });
})

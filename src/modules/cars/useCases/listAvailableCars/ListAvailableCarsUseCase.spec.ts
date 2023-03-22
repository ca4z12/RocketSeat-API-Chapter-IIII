import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";



let listAvaibleCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvaibleCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })


    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car1",
            "description": "Car Desc",
            "brand": "Car_brand",
            "daily_rate": 140,
            "fine_amount": 100,
            "license_plate": "Car_Plate",
            "category_id": "Category_id"
        });

        const cars = await listAvaibleCarsUseCase.execute({
            brand: "Car_brand",
        });
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car2",
            "description": "Car Desc",
            "brand": "Car_brand_test",
            "daily_rate": 140,
            "fine_amount": 100,
            "license_plate": "Car_Plate",
            "category_id": "Category_id"
        });

        const cars = await listAvaibleCarsUseCase.execute({
            brand: "Car_brand_test",
        });
        
        expect(cars).toEqual([car]);
        
    });

    it("Should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car_name_test",
            "description": "Car Desc",
            "brand": "Car_brand_test",
            "daily_rate": 140,
            "fine_amount": 100,
            "license_plate": "Car_Plate",
            "category_id": "Category_id"
        });

        const cars = await listAvaibleCarsUseCase.execute({
            name: "Car_name_test",
        });
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car_name_test",
            "description": "Car Desc",
            "brand": "Car_brand_test",
            "daily_rate": 140,
            "fine_amount": 100,
            "license_plate": "Car_Plate",
            "category_id": "12345"
        });

        const cars = await listAvaibleCarsUseCase.execute({
            category_id: "12345",
        });
        
        expect(cars).toEqual([car]);
    });
})


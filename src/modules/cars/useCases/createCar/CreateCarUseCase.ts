import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    brand: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    category_id: string;
}

@injectable()
class CreateCarUseCase {

    constructor(
        @inject("CarsRepository")
        private carsRepositoryInMemory: ICarsRepository) {}

    async execute({ 
        name,
        description,
        brand,
        daily_rate,
        license_plate,
        fine_amount,
        category_id,
     }: IRequest): Promise<Car> {

        const carAlreadyExists = await this.carsRepositoryInMemory.findByPlate(
            license_plate
        )

        if (carAlreadyExists) {
            throw new AppError("Car already exists")
        }

        const car = await this.carsRepositoryInMemory.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        })
        
        return car;
    }
}

export { CreateCarUseCase }
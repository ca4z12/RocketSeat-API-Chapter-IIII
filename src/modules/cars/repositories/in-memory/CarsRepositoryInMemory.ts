import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";



class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    async create({
        name,
        description,
        brand,
        daily_rate,
        fine_amount,
        license_plate,
        category_id,
        id,

    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            brand,
            daily_rate,
            fine_amount,
            license_plate,
            category_id,
            id,
        });

        this.cars.push(car);

        return car;
    }

    async findByPlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(
            car => car.license_plate === license_plate)

        return car;
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string,
    ): Promise<Car[]> {
        const allAvailable = this.cars.filter((car) => {
            if (
                car.available === true ||
                ((brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name))
             ) {
                return car;
             }
             return null;
        });

        return allAvailable;
    }

    async findById(cars_id: string): Promise<Car> {
        return this.cars.find(car => car.id === cars_id)
    }

}

export { CarsRepositoryInMemory }
import { getRepository, Repository } from "typeorm"
import { Car } from "../entities/Car"
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"



class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        brand,
        daily_rate,
        fine_amount,
        license_plate,
        category_id,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            brand,
            daily_rate,
            fine_amount,
            license_plate,
            category_id,
            specifications,
            id,
        });

        await this.repository.save(car)

        return car;
    }

    async findByPlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    async findAvailable(
        category_id: string,
        brand: string,
        name: string): Promise<Car[]> {


        const carsQuery = await this.repository
        .createQueryBuilder("c")
        .where("available = :available", { available: true })

        if(brand) {
            carsQuery.andWhere("c.brand = :brand", { brand })
        }

        if(name) {
            carsQuery.andWhere("c.name = :name", { name })
        }

        if(category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }

        const cars = carsQuery.getMany();

        return cars;
    }

    async findById(cars_id: string): Promise<Car> {
        const car = await this.repository.findOne(cars_id);
        return car;
    }


}

export { CarsRepository }
import { Specification } from "../infra/typeorm/entities/Specification";


interface ICreateCarDTO {
    name: string;
    description: string;
    brand: string;
    daily_rate: number;
    fine_amount: number;
    license_plate: string;
    category_id: string;
    specifications?: Specification[];
    id?: string;
}

export { ICreateCarDTO }
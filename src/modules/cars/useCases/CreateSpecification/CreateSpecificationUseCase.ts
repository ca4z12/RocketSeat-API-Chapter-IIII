import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/Apperror";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specification = await this.specificationsRepository.findByName(name)

        if(specification) {
            throw new AppError("This specification already exists")
        }

        await this.specificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }
import { injectable, inject } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}


@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const category = await this.categoriesRepository.findByName(name);

        if(category) {
            throw new AppError("This category already exists!")
        }

        await this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }
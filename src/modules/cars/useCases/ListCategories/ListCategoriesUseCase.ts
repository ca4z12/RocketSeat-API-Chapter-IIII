import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";



class ListCategoriesUseCase {
    
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(): Promise<Category[]> {
        const categoriesList = this.categoriesRepository.list();

        return categoriesList
    }
}

export { ListCategoriesUseCase }
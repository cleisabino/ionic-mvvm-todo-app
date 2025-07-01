import { CategoryRepository } from 'src/app/domain/repositories/category.repository';
import { Category } from 'src/app/domain/entities/category.entity';

export class GetAllCategoriesUseCase {
  constructor(private repository: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.repository.getAll();
  }
}
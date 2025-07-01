import { Category } from 'src/app/domain/entities/category.entity';
import { CategoryRepository } from 'src/app/domain/repositories/category.repository';

export class UpdateCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  execute(category: Category): Promise<Category> {
    return this.repository.update(category);
  }
}
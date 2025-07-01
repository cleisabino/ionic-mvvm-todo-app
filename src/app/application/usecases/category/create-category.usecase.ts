import { Category } from 'src/app/domain/entities/category.entity';
import { Task } from 'src/app/domain/entities/task.entity';
import { CategoryRepository } from 'src/app/domain/repositories/category.repository';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';

export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  execute(category: Omit<Category, 'id'>): Promise<Category> {
    return this.repository.create(category as Category);
  }
}
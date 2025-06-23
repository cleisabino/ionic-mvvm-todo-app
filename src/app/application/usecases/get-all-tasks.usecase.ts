import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';

export class GetAllTasksUseCase {
  constructor(private repository: TaskRepository) {}

  execute(): Promise<Task[]> {
    return this.repository.getAll();
  }
}
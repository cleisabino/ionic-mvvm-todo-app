import { Task } from 'src/app/domain/entities/task.entity';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';

export class CreateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(task: Omit<Task, 'id'>): Promise<Task> {
    return this.repository.create(task as Task);
  }
}
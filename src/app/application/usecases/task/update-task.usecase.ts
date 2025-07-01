import { Task } from 'src/app/domain/entities/task.entity';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';

export class UpdateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(task: Task): Promise<Task> {
    return this.repository.update(task);
  }
}
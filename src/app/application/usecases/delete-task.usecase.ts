import { TaskRepository } from 'src/app/domain/repositories/task.repository';

export class DeleteTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
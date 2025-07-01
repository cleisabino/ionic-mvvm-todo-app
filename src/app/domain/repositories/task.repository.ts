import { BaseRepository } from 'src/app/shared/bases/base-repository';
import { Task } from '../entities/task.entity';

export interface TaskRepository extends BaseRepository<Task> {
    
}
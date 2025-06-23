import { Task } from '../entities/task.entity';

export interface TaskRepository {
    getAll(): Promise<Task[]>;
    getById(id: string): Promise<Task>;
    create(task: Task): Promise<Task>;
    update(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}
import { computed, inject, Injectable, signal } from '@angular/core';
import { CreateTaskUseCase } from 'src/app/application/usecases/create-task.usecase';
import { DeleteTaskUseCase } from 'src/app/application/usecases/delete-task.usecase';
import { GetAllTasksUseCase } from 'src/app/application/usecases/get-all-tasks.usecase';
import { UpdateTaskUseCase } from 'src/app/application/usecases/update-task.usecase';
import { Task } from 'src/app/domain/entities/task.entity';
import { NotificationService } from 'src/app/infrastructure/native/notification.service';
import { TaskApiService } from 'src/app/infrastructure/remote/task-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskViewModel {
  private getAllTask = new GetAllTasksUseCase(inject(TaskApiService));
  private deleteTask = new DeleteTaskUseCase(inject(TaskApiService));
  private updateTask = new UpdateTaskUseCase(inject(TaskApiService));
  private notificationService = inject(NotificationService);
  
  tasks = signal<Task[]>([]);
  
  async load() {
    this.notificationService.requestPermission();
    const result = await this.getAllTask.execute();
    this.tasks.set(result);
  }

  async delete(id: string) {
    await this.notificationService.cancelReminder(id);
    await this.deleteTask.execute(id);
  }
  
  async update(task: Task) {
    await this.updateTask.execute(task);
  }
}
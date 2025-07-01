import { computed, inject, Injectable, signal } from '@angular/core';
import { GetAllCategoriesUseCase } from 'src/app/application/usecases/category/get-all-category.usecase';
import { CreateTaskUseCase } from 'src/app/application/usecases/task/create-task.usecase';
import { DeleteTaskUseCase } from 'src/app/application/usecases/task/delete-task.usecase';
import { GetAllTasksUseCase } from 'src/app/application/usecases/task/get-all-tasks.usecase';
import { UpdateTaskUseCase } from 'src/app/application/usecases/task/update-task.usecase';
import { Category } from 'src/app/domain/entities/category.entity';
import { Task } from 'src/app/domain/entities/task.entity';
import { NotificationService } from 'src/app/infrastructure/native/notification.service';
import { CategoryApiService } from 'src/app/infrastructure/remote/category-api.service';
import { TaskApiService } from 'src/app/infrastructure/remote/task-api.service';
import { BaseViewModel } from 'src/app/shared/bases/base-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class TaskViewModel extends BaseViewModel<Task> {

  protected service = inject(TaskApiService);
  
  private getAllTask = new GetAllTasksUseCase(inject(TaskApiService));
  private deleteTask = new DeleteTaskUseCase(inject(TaskApiService));
  private updateTask = new UpdateTaskUseCase(inject(TaskApiService));
  private getAllCategories = new GetAllCategoriesUseCase(inject(CategoryApiService));
  private notificationService = inject(NotificationService);
  
  categories = signal<Category[]>([]);
  
  override async load() {
    this.notificationService.requestPermission();
    const [tasks, categories] = await Promise.all([
      this.getAllTask.execute(),
      this.getAllCategories.execute()
    ]);
    
    this.items.set(tasks);
    this.categories.set(categories);
  }

  getCategoryById(id: string | undefined): Category | undefined {
    return this.categories().find(cat => cat.id === id);
  }

  async delete(id: string) {
    await this.notificationService.cancelReminder(id);
    await this.deleteTask.execute(id);
  }
  
  async update(task: Task) {

    task.completed ? await this.notificationService.cancelReminder(task.id) : this.notificationService.scheduleReminder(task);
    
    await this.updateTask.execute(task);
  }
}
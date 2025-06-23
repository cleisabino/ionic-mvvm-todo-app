import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TaskRepository } from 'src/app/domain/repositories/task.repository';
import { Task } from 'src/app/domain/entities/task.entity';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService implements TaskRepository {
  private http = inject(HttpClient);

  private baseUrl = 'https://685870dd138a18086dfaf840.mockapi.io/api/v1/tasks';

  constructor() {}

  getAll(): Promise<Task[]> {
    return firstValueFrom(this.http.get<Task[]>(this.baseUrl));
  }

  getById(id: string): Promise<Task> {
    return firstValueFrom(this.http.get<Task>(`${this.baseUrl}/${id}`));
  }

  create(task: Task): Promise<Task> {
    return firstValueFrom(this.http.post<Task>(this.baseUrl, task));
  }

  update(task: Task): Promise<Task> {
    return firstValueFrom(this.http.put<Task>(`${this.baseUrl}/${task.id}`, task));
  }

  delete(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }
}
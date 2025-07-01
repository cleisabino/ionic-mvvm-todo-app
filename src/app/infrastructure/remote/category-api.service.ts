import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Category } from "src/app/domain/entities/category.entity";
import { CategoryRepository } from "src/app/domain/repositories/category.repository";

@Injectable({ providedIn: 'root' })
export class CategoryApiService implements CategoryRepository {
    
    private http = inject(HttpClient);

    private baseUrl = 'https://685870dd138a18086dfaf840.mockapi.io/api/v1/categories';

    getAll(): Promise<Category[]> {
        return firstValueFrom(this.http.get<Category[]>(this.baseUrl));
    }
    getById(id: string): Promise<Category> {
        return firstValueFrom(this.http.get<Category>(`${this.baseUrl}/${id}`));
    }
    create(item: Category): Promise<Category> {
        return firstValueFrom(this.http.post<Category>(this.baseUrl, item));
    }
    update(item: Category): Promise<Category> {
        return firstValueFrom(this.http.put<Category>(`${this.baseUrl}/${item.id}`, item));
    }
    delete(id: string): Promise<void> {
        return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
    }

}
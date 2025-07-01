import { inject, Injectable, signal } from "@angular/core";
import { Category } from "src/app/domain/entities/category.entity";
import { CategoryApiService } from "src/app/infrastructure/remote/category-api.service";
import { BaseViewModel } from "src/app/shared/bases/base-viewmodel";

@Injectable({
  providedIn: 'root'
})
export class CategoryViewModel extends BaseViewModel<Category>{
    
  protected service = inject(CategoryApiService);

  categories = signal<Category[]>([]);

  async save(category: Category) {
    await this.service.create(category);
    await this.load();
  }

  async delete(id: string) {
    await this.service.delete(id);
    await this.load();
  }
}
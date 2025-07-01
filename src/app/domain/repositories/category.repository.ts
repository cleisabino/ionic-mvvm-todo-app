import { BaseRepository } from "src/app/shared/bases/base-repository";
import { Category } from "../entities/category.entity";

export interface CategoryRepository extends BaseRepository<Category>  {
}
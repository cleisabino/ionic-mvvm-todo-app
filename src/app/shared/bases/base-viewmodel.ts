import { signal } from '@angular/core';
import { IViewModel } from '../contracts/viewmodel.interface';

export abstract class BaseViewModel<T> implements IViewModel{
  public items = signal<T[]>([]);
  protected abstract service: { getAll(): Promise<T[]> };

  async load() {
    const result = await this.service.getAll();
    this.items.set(result);
  }
}
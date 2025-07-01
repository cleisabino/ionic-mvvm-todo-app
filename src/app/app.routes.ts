import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'task',
    loadComponent: () => import('./presentation/tasks/pages/task/task.page').then( m => m.TaskPage)
  },
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  },
  {
    path: 'category',
    loadComponent: () => import('./presentation/category/pages/category/category.page').then( m => m.CategoryPage)
  },
];

import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonTextarea, ModalController, IonDatetime, IonSelect, IonSelectOption, IonIcon, IonText } from '@ionic/angular/standalone';
// import { ModalController } from '@ionic/angular';
import { Task } from 'src/app/domain/entities/task.entity';
import { TaskApiService } from 'src/app/infrastructure/remote/task-api.service';
import { UpdateTaskUseCase } from 'src/app/application/usecases/task/update-task.usecase';
import { CreateTaskUseCase } from 'src/app/application/usecases/task/create-task.usecase';
import { NotificationService } from 'src/app/infrastructure/native/notification.service';
import { GetAllCategoriesUseCase } from 'src/app/application/usecases/category/get-all-category.usecase';
import { CategoryApiService } from 'src/app/infrastructure/remote/category-api.service';
import { Category } from 'src/app/domain/entities/category.entity';
import { addIcons } from 'ionicons';
import { ellipse, ellipseOutline } from 'ionicons/icons';
import { reminderDateValidator } from 'src/app/shared/validators/reminder-date.validator';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonIcon,
    IonSelect, 
    IonSelectOption,
    IonText,
  ],
})
export class TaskFormComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private updateTask = new UpdateTaskUseCase(inject(TaskApiService));
  private createTask = new CreateTaskUseCase(inject(TaskApiService));
  private getAllCategories = new GetAllCategoriesUseCase(inject(CategoryApiService));
  private notificationService = inject(NotificationService);

  @Input() task?: Task;

  form: FormGroup;
  categorias: Category[] = [];
  categoriaSelecionada?: Category;

  constructor() {
    
    addIcons({ellipseOutline,ellipse});

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      reminderDate: [null, [reminderDateValidator]],
      categoryId: [null],
    });
  }

  async ngOnInit() {
    this.categorias = await this.getAllCategories.execute();

    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        reminderDate: this.task.reminderDate,
        categoryId: this.task.categoryId
      });

      this.categoriaSelecionada = this.categorias.find(cat => cat.id === this.task?.categoryId);
    }
  }

  onCategoriaChange(id: string) {
    this.categoriaSelecionada = this.categorias.find(cat => cat.id === id);
  }

  async salvar() {
    const data = this.form.value;
    if (this.task) {
      const updated = { ...this.task, ...data };
      await this.updateTask.execute(updated);
      updated.completed ? await this.notificationService.cancelReminder(updated.id) : await this.notificationService.scheduleReminder(updated);
    } else {
      const newTask = await this.createTask.execute({
        ...data,
        completed: false
      } as Task);
      await this.notificationService.scheduleReminder(newTask);
    }

    this.modalCtrl.dismiss(true);
  }

  fechar() {
    this.modalCtrl.dismiss(false);
  }

}

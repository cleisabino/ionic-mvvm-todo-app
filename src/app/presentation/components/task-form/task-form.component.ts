import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonTextarea, ModalController, IonDatetime } from '@ionic/angular/standalone';
// import { ModalController } from '@ionic/angular';
import { Task } from 'src/app/domain/entities/task.entity';
import { TaskApiService } from 'src/app/infrastructure/remote/task-api.service';
import { UpdateTaskUseCase } from 'src/app/application/usecases/update-task.usecase';
import { CreateTaskUseCase } from 'src/app/application/usecases/create-task.usecase';
import { NotificationService } from 'src/app/infrastructure/native/notification.service';


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
    IonDatetime
  ],
})
export class TaskFormComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private updateTask = new UpdateTaskUseCase(inject(TaskApiService));
  private createTask = new CreateTaskUseCase(inject(TaskApiService));
  private notificationService = inject(NotificationService);

  @Input() task?: Task;

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      reminderDate: [null],
    });
  }

  ngOnInit() {
    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description,
        reminderDate: this.task.reminderDate,
      });
    }
  }

  async salvar() {
    const data = this.form.value;
    if (this.task) {
      const updated = { ...this.task, ...data };
      await this.updateTask.execute(updated);
      await this.notificationService.scheduleReminder(updated);
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

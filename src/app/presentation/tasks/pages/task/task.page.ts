import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonText, IonIcon, IonList, IonItem, IonCheckbox, IonLabel, IonRefresher, IonRefresherContent, RefresherEventDetail, ModalController, AlertController } from '@ionic/angular/standalone';
import { TaskViewModel } from '../../view-models/task.viewmodel';
import { Task } from '../../../../domain/entities/task.entity'
import { TaskFormComponent } from 'src/app/presentation/tasks/components/task-form/task-form.component';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline, calendarOutline, pricetagOutline, pricetag, calendar } from 'ionicons/icons';
import { BasePage } from 'src/app/shared/bases/base-page';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButtons,
    IonButton,
    IonText,
    IonIcon,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
  ]
})
export class TaskPage extends BasePage<TaskViewModel> implements OnInit {

  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);
  
  constructor() { 
    super(inject(TaskViewModel))
    addIcons({pricetag,calendar,createOutline,trashOutline});
  }

  ngOnInit() {
    this.init();
  }

  async abrirFormulario() {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
    });

    modal.onDidDismiss().then(() => this.vm.load());
    await modal.present();
  }

  async editar(task: Task) {
    const modal = await this.modalCtrl.create({
      component: TaskFormComponent,
      componentProps: { task: task }
    });

    modal.onDidDismiss().then(() => this.vm.load());
    await modal.present();
  }

  async alternarStatus(task: Task) {
    const updated = { ...task, completed: !task.completed };
    await this.vm.update(updated);
    this.vm.load();
  }

  async deletar(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Deseja realmente excluir esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            await this.vm.delete(id);
            this.vm.load();
          }
        }
      ]
    });
  
    await alert.present();
  }

  abrirCategorias() {
    this.router.navigateByUrl('/category');
  }

}

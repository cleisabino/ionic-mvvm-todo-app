import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonList, IonItem, IonLabel, IonText, IonRefresher, IonRefresherContent, ModalController, AlertController, IonIcon, IonAvatar, IonBackButton } from '@ionic/angular/standalone';
import { CategoryViewModel } from '../../view-models/category.viewmodel';
import { BasePage } from 'src/app/shared/bases/base-page';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { Category } from 'src/app/domain/entities/category.entity';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonText,
    IonIcon,
    IonAvatar,
    IonBackButton,
    IonRefresher,
    IonRefresherContent,
  ]
})
export class CategoryPage extends BasePage<CategoryViewModel> implements OnInit {
  
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);

  constructor() { 
    super(inject(CategoryViewModel));
    addIcons({createOutline});
  }

  ngOnInit() {
    this.vm.load();
  }

  async abrirFormulario() {
    const modal = await this.modalCtrl.create({
      component: CategoryFormComponent,
    });

    modal.onDidDismiss().then(() => this.vm.load());
    await modal.present();
  }

  async editar(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryFormComponent,
      componentProps: { category: category }
    });

    modal.onDidDismiss().then(() => this.vm.load());
    await modal.present();
  }

}

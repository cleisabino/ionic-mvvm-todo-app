import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonTextarea, ModalController, IonDatetime } from '@ionic/angular/standalone';
import { Category } from 'src/app/domain/entities/category.entity';
import { UpdateCategoryUseCase } from 'src/app/application/usecases/category/update-category.usecase';
import { CategoryApiService } from 'src/app/infrastructure/remote/category-api.service';
import { CreateCategoryUseCase } from 'src/app/application/usecases/category/create-category.usecase';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
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
export class CategoryFormComponent  implements OnInit {

  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private updateCategory = new UpdateCategoryUseCase(inject(CategoryApiService));
  private createCategory = new CreateCategoryUseCase(inject(CategoryApiService));

  @Input() category?: Category;
  
  form: FormGroup;
  
  constructor() { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000']
    });
  }

  ngOnInit() {
    if (this.category) {
      this.form.patchValue({
        name: this.category.name,
        color: this.category.color,
      });
    }
  }

  async salvar() {
    const data = this.form.value;
    if (this.category) {
      const updated = { ...this.category, ...data };
      await this.updateCategory.execute(updated);
    } else {
      const newTask = await this.createCategory.execute(data);
    }

    this.modalCtrl.dismiss(true);
  }

  fechar() {
    this.modalCtrl.dismiss(false);
  }

}

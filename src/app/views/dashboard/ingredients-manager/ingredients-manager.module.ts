import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsManagerComponent } from './ingredients-manager.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';



@NgModule({
  declarations: [
    IngredientsManagerComponent,
    AddIngredientComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IngredientsManagerModule { }

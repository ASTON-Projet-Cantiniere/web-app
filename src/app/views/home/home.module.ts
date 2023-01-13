import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MealComponent } from '../meal/meal.component';
import { MealModalComponent } from '../meal/meal-modal/meal-modal.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeRoutes),
  ],
  declarations: [
  	HomeComponent,
    MealComponent,
    MealModalComponent
  ]
})
export class HomeModule{ }

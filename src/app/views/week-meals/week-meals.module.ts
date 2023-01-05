import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {WeekMealsRoutes} from './week-meals.routing';
import {WeekMealsComponent} from './week-meals.component';

@NgModule({
  declarations: [
    WeekMealsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WeekMealsRoutes),
  ]
})
export class WeekMealsModule {
}

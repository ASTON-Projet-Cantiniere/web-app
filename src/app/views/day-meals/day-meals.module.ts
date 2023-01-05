import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MealsOfTheWeekRoutes} from './day-meals.routing';
import {DayMealsComponent} from './day-meals.component';

@NgModule({
  declarations: [
    DayMealsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MealsOfTheWeekRoutes),
  ]
})
export class DayMealsModule {
}

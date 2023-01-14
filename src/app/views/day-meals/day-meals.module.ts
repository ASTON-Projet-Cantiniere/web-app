import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MealsOfTheWeekRoutes} from './day-meals.routing';
import {DayMealsComponent} from './day-meals.component';
import { DayMealsDialogComponent } from './day-meals-dialog/day-meals-dialog.component';

@NgModule({
  declarations: [
    DayMealsComponent,
    DayMealsDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MealsOfTheWeekRoutes),
  ]
})
export class DayMealsModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MealsOfTheWeekRoutes} from './meals-of-the-week.routing';
import {MealsOfTheWeekComponent} from './meals-of-the-week.component';

@NgModule({
  declarations: [
    MealsOfTheWeekComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MealsOfTheWeekRoutes),
  ]
})
export class MealsOfTheWeekModule {
}

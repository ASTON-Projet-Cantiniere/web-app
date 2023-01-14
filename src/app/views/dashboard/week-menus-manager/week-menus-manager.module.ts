import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekMenusManagerComponent } from './week-menus-manager.component';
import {RouterModule} from "@angular/router";
import {WeekMenusManagerRoutes} from "@views/dashboard/week-menus-manager/week-menus-manager.routing";


@NgModule({
  declarations: [
    WeekMenusManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WeekMenusManagerRoutes),
  ]
})
export class WeekMenusManagerModule { }

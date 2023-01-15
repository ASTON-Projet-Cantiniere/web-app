import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekMenusManagerComponent } from './week-menus-manager.component';
import {RouterModule} from "@angular/router";
import {WeekMenusManagerRoutes} from "@views/dashboard/week-menus-manager/week-menus-manager.routing";
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WeekMenusManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WeekMenusManagerRoutes),
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WeekMenusManagerModule { }

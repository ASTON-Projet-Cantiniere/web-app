import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DashboardRoutes} from "@views/dashboard/dashboard.routing";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {DashboardComponent} from "@views/dashboard/dashboard.component";
import {IngredientsManagerComponent} from "@views/dashboard/ingredients-manager/ingredients-manager.component";
import {MenusManagerComponent} from "@views/dashboard/menus-manager/menus-manager.component";
import {WeekMenusManagerComponent} from "@views/dashboard/week-menus-manager/week-menus-manager.component";
import {DashboardCardComponent} from "@views/dashboard/dashboard-card/dashboard-card.component";
import{ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  declarations: [
    DashboardComponent,
    IngredientsManagerComponent,
    MenusManagerComponent,
    WeekMenusManagerComponent,
    DashboardCardComponent,
  ]
})
export class DashboardModule {
}

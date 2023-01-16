import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DashboardRoutes} from "@views/dashboard/dashboard.routing";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {DashboardComponent} from "@views/dashboard/dashboard.component";
import {IngredientsManagerComponent} from "@views/dashboard/ingredients-manager/ingredients-manager.component";
import {DashboardCardComponent} from "@views/dashboard/dashboard-card/dashboard-card.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(DashboardRoutes),
  ],
  declarations: [
    DashboardComponent,
    IngredientsManagerComponent,
    DashboardCardComponent,
  ]
})
export class DashboardModule {
}

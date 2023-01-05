import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdateConstraintsComponent} from './update-constraints/update-constraints.component';
import {OrdersManagerComponent} from './orders-manager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {OrdersManagerRoutes} from "@views/dashboard/orders-manager/orders-manager.routing";

@NgModule({
  declarations: [
    UpdateConstraintsComponent,
    OrdersManagerComponent,
    UpdateConstraintsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(OrdersManagerRoutes),
  ],

})
export class OrdersManagerModule {
}

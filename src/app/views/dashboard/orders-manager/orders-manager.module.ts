import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateConstraintsComponent } from './update-constraints/update-constraints.component';
import { OrdersManagerComponent } from './orders-manager.component';



@NgModule({
  declarations: [
    UpdateConstraintsComponent,
    OrdersManagerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrdersManagerModule { }

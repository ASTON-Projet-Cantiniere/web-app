import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CartRoutes} from '@views/cart/cart.routing';
import {CartComponent} from "@views/cart/cart.component";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CartRoutes),
  ]
})
export class CartModule {
}

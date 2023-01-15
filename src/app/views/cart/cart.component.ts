import {Component} from '@angular/core';
import {CartService} from "@shared/services/cart.service";
import {CartItem, WeekDay} from "@shared/models/cart-item.model";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "@shared/services/auth.service";
import {OrderService} from "@shared/services/order.service";
import {newOrder, Order} from "@shared/models/order.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public cart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private authService: AuthService,
    private orderService: OrderService) {
    this.cartService.listenCartState().subscribe((cart: CartItem[]) => this.cart = cart);

  }

  public removeItemFromCart(item: CartItem) {
    this.cartService.removeItemFromCart(item);
  }

  public getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  public getTotalQuantity(item: CartItem): number {
    return this.cartService.getTotalQuantity(item);
  }

  public getItemByDay(day: WeekDay): CartItem[] {
    return this.cartService.getItemsByDay(day);
  }

  public days(): WeekDay[] {
    return [...Object.values(WeekDay)]
  }

  public wallet(): number {
    const user = this.authService.getUser();
    return user ? user.wallet : 0;
  }

  public validOrder() {
    // if user is not logged in, redirect to login page
    if (!this.authService.isAuthentified()) {
      this.authService.gotoSignIn();
      return;
    }
    // if cart is empty, show a message
    if (this.cart.length === 0) {
      this.toastr.warning('Votre panier est vide');
      return;
    }
    // if user wallet is not enough, show a message
    const user = this.authService.getUser();
    if (user) {
      if (user.wallet < this.getTotalPrice()) {
        this.toastr.warning('Votre porte-monnaie est insuffisant');
        return;
      }
      // if everything is ok, create an order
      this.orderService.createOrder({
        userId: user.id,
        constraintId: -1,
        quantity: this.cart.map((item: CartItem) => {
          return {
            // mealId: item.meal.id,
            menuId: item.menu.id,
            quantity: item.quantity
          }
        })} as newOrder).subscribe(() => {
        this.toastr.success('Commande validée');
        this.cartService.clearCart();
      });
    }
  }
}

import {Injectable, OnDestroy} from '@angular/core';
import {Menu} from "@shared/models/menu.model";
import {BroadcasterService} from "@core/services/broadcaster.service";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {CONSTANTS} from "@core/constants";
import {CartItem, WeekDay} from "@shared/models/cart-item.model";

@Injectable({providedIn: 'root'})
export class CartService implements OnDestroy {
  private $destroy = new Subject();
  private $cartState = this.broadcaster.on<CartItem[]>(CONSTANTS.CART_STATE).pipe(takeUntil(this.$destroy));
  private cart: CartItem[] = [];
  private cartCount: number = 0;

  constructor(private broadcaster: BroadcasterService) {
    this.$cartState.subscribe((cart: CartItem[]) => {
      this.cart = cart;
      this.cartCount = cart.length;
    });
    this.emitCartCount();
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }

  /**
   * Listener of the cart state.
   * @return {Observable<CartItem[]>}
   */
  listenCartState(): Observable<CartItem[]> {
    return this.$cartState;
  }

  /**
   * Listener of the cart count.
   * @return {Observable<number>}
   */
  listenCartCount(): Observable<number> {
    return this.$cartState.pipe(map(() => this.cartCount));
  }

  /**
   * Emit the cart count.
   */
  emitCartCount() {
    this.broadcaster.broadcast(CONSTANTS.CART_STATE, this.readCartInLocalStorage());
  }

  /**
   * Read the cart in the local storage.
   * @return {CartItem[]}
   * @private
   */
  private readCartInLocalStorage(): CartItem[] {
    return JSON.parse(localStorage.getItem('cart_items') || '[]');
  }

  /**
   * Write the cart in the local storage.
   * @param cart
   * @private
   */
  private writeCartInLocalStorage(cart: CartItem[]): void {
    localStorage.setItem('cart_items', JSON.stringify(cart));
    this.emitCartCount();
  }

  /**
   * Add a menu to the cart.
   * @param cartItem
   */
  addItemToCart(cartItem: CartItem) {
    const cart = this.readCartInLocalStorage();
    cart.push(cartItem);
    this.writeCartInLocalStorage(cart);
  }

  /**
   * Get the cart.
   * @return {CartItem[]}
   */
  getCart(): CartItem[] {
    return this.readCartInLocalStorage();
  }

  /**
   * Remove a item from the cart.
   * @param item
   */
  removeItemFromCart(item: CartItem) {
    const cart = this.readCartInLocalStorage();
    const index = cart.findIndex((cartItem) => {
      if (cartItem.menu) {
        return cartItem.menu.id === item.menu?.id ?? -1;
      } else if (cartItem.meal) {
        return cartItem.meal.id === item.meal?.id ?? -1;
      }
      return null;
    });
    cart.splice(index, 1);
    this.writeCartInLocalStorage(cart);
  }

  /**
   * Get the total price of the cart.
   * @return {number}
   */
  getTotalPrice(): number {
    // check for each item if it is a menu or a meal and calculate the price accordingly
    return this.cart.reduce((total, cartItem) => {
      if (cartItem.menu) {
        return total + cartItem.menu.priceDF * cartItem.quantity;
      } else if (cartItem.meal) {
        return total + cartItem.meal!.priceDF * cartItem.quantity;
      }
      return total;
    }, 0);
  }

  /**
   * Get the total quantity of a menu in the cart.
   * @param item
   * @return {number}
   */
  getTotalQuantity(item: CartItem): number {
    return this.cart.reduce((total, cartItem) => {
      if (cartItem.menu) {
        return cartItem.menu.id === item.menu?.id ? total + cartItem.quantity : total;
      } else if (cartItem.meal) {
        return cartItem.meal.id === item.meal?.id ? total + cartItem.quantity : total;
      }
      return total;
    }, 0);
  }

  /**
   * Get the menus by day.
   * @param day
   * @return {Menu[]}
   */
  getItemsByDay(day: WeekDay):
    CartItem[] {
    return this.cart.filter((cartItem) => cartItem.day === day);
  }

  /**
   * Clear the cart.
   * @return {void}
   */
  clearCart(): void {
    this.writeCartInLocalStorage([]);
  }
}

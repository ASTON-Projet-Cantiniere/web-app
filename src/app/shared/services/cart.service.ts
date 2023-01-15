import {Injectable, OnDestroy} from '@angular/core';
import {Menu} from "@shared/models/menu.model";
import {BroadcasterService} from "@core/services/broadcaster.service";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {CONSTANTS} from "@core/constants";

@Injectable({providedIn: 'root'})
export class CartService implements OnDestroy {
  private $destroy = new Subject();
  private $cartState = this.broadcaster.on<Menu[]>(CONSTANTS.CART_STATE).pipe(takeUntil(this.$destroy));
  private cart: Menu[] | undefined;
  private cartCount: number = 0;

  constructor(private broadcaster: BroadcasterService) {
    this.$cartState.subscribe((cart: Menu[]) => {
      this.cart = cart;
      this.cartCount = cart.length;
    });
    this.initCartState();
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }

  listenCartState(): Observable<Menu[]> {
    return this.$cartState;
  }

  listenCartCount(): Observable<number> {
    return this.$cartState.pipe(map(() => this.cartCount));
  }

  private initCartState() {
    this.broadcaster.broadcast(CONSTANTS.CART_STATE, this.readCartInLocalStorage());
  }

  /**
   * Read the cart in the local storage.
   * @return {Menu[]}
   * @private
   */
  private readCartInLocalStorage(): Menu[] {
    return JSON.parse(localStorage.getItem('cart_items') || '[]');
  }

  /**
   * Write the cart in the local storage.
   * @param cart
   * @private
   */
  private writeCartInLocalStorage(cart: Menu[]): void {
    localStorage.setItem('cart_items', JSON.stringify(cart));
  }

  /**
   * Add a menu to the cart.
   * @param menu
   */
  addMenuToCart(menu: Menu) {
    const cart = this.readCartInLocalStorage();
    cart.push(menu);
    this.writeCartInLocalStorage(cart);
    this.initCartState();
  }

  /**
   * Get the cart.
   * @return {Menu[]}
   */
  getCart(): Menu[] {
    return this.readCartInLocalStorage();
  }

  /**
   * Remove a menu from the cart.
   * @param menu
   */
  removeMenuFromCart(menu: Menu) {
    const cart = this.readCartInLocalStorage();
    const index = cart.findIndex((cartMenu) => cartMenu.id === menu.id);
    cart.splice(index, 1);
    this.writeCartInLocalStorage(cart);
    this.initCartState();
  }

  /**
   * Get the total price of the cart.
   * @return {number}
   */
  getTotalPrice(): number {
    return this.readCartInLocalStorage().reduce((total, menu) => total + menu.priceDF, 0);
  }
}

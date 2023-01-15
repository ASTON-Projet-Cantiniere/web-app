import { Injectable } from '@angular/core';
import {Menu} from "@shared/models/menu.model";

@Injectable({providedIn: 'root'})
export class CartService {

  constructor() {
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
  }

  /**
   * Get the total price of the cart.
   * @return {number}
   */
  getTotalPrice(): number {
    const cart = this.readCartInLocalStorage();
    return cart.reduce((total, menu) => total + menu.priceDF, 0);
  }
}

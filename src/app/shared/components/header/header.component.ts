import {Component} from '@angular/core';
import {AuthService} from "@shared/services/auth.service";
import {User} from "@shared/models/user.model";
import {CartService} from "@shared/services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public user: User | undefined;
  public itemsCount: string = '';

  constructor(private authService: AuthService, private cartService: CartService) {
    this.authService.listenUserState().subscribe((user: User) => this.user = user);
    this.cartService.listenCartCount().subscribe((count: number) => this.itemsCount = count.toString());
    this.authService.emitUserState();
    this.cartService.emitCartCount();
  }
}

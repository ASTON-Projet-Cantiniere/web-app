import {Component} from '@angular/core';
import {AuthService} from "@core/services/auth.service";
import {User} from "@shared/models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public user: User | undefined;
  public itemsCount: string = '1';

  constructor(private authService: AuthService) {
    this.authService.listenUserState().subscribe((user: User) => this.user = user);
    this.authService.emitUserState();
  }

  hasItem() {
    return true;
  }
}

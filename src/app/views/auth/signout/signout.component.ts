import {Component} from '@angular/core';
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-signout',
  template: '',
})
export class SignoutComponent {
  constructor(private authService: AuthService) {
    this.authService.signOut();
  }
}

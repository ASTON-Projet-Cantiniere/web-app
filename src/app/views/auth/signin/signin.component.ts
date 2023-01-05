import {Component} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import Credentials from "@shared/models/credentials.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private authService: AuthService) {
  }

  private credentials: Credentials = {
    email: 'toto@gmail.com',
    password: 'bonjour'
  }

  pocLogin() {
    this.authService.signIn(this.credentials);
  }
}

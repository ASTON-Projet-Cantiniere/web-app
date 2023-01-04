import {Component} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import Credentials from "@core/models/credentials.model";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  private credentials: Credentials = {
    email: 'toto@gmail.com',
    password: 'bonjour'
  }

  constructor(private authService: AuthService) {
  }

  pocLogin() {
    this.authService.signIn(this.credentials);
  }
}

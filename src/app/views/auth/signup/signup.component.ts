import { Component } from '@angular/core';
import {RegisterCredentials} from "@shared/models/register-credentials.model";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  inscription: RegisterCredentials = {
    name: "",
    firstname: "",
    email: "",
    password: "",
    sex: 0
  }

  constructor(private authService: AuthService) {
  }

  inscription_methode(){
    this.authService.signUp(this.inscription);
  }
}

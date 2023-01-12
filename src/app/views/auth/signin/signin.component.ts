import {Component} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import Credentials from "@shared/models/credentials.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  public onSubmit() {
    this.authService.signIn({
      email: this.email?.value,
      password: this.password?.value
    } as Credentials);
  }
}

import {Component} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import Credentials from "@shared/models/credentials.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  public gotoSignup() {
    this.authService.gotoSignUp();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signIn({
        email: this.email?.value,
        password: this.password?.value
      } as Credentials);
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}

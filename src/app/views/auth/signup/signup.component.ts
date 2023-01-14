import {Component} from '@angular/core';
import {AuthService} from "@core/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterCredentials} from "@shared/models/register-credentials.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      sex: new FormControl(0, [Validators.required, Validators.pattern('^[0-1]$')]),
    });
  }

  public get name() {
    return this.loginForm.get('name');
  }

  public get firstName() {
    return this.loginForm.get('firstname');
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  public get sex() {
    return this.loginForm.get('sex');
  }

  private getCredentials(): RegisterCredentials {
    return {
      name: this.loginForm.get('name')?.value,
      firstname: this.loginForm.get('firstName')?.value,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      sex: this.loginForm.get('sex')?.value,
    }
  }

  public gotoSignin() {
    this.authService.gotoSignIn();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.signUp(this.getCredentials());
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

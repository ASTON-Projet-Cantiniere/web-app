import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "@shared/services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterCredentials} from "@shared/models/register-credentials.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {

  public registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      sex: new FormControl(0, [Validators.required, Validators.pattern('^[0-1]$')]),
    });
  }

  public get name() {
    return this.registerForm.get('name');
  }

  public get firstName() {
    return this.registerForm.get('firstname');
  }

  public get email() {
    return this.registerForm.get('email');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get sex() {
    return this.registerForm.get('sex');
  }

  private getCredentials(): RegisterCredentials {
    return {
      name: this.name?.value,
      firstname: this.firstName?.value,
      email: this.email?.value,
      password: this.password?.value,
      sex: this.sex?.value,
    }
  }

  public gotoSignin() {
    this.authService.gotoSignIn();
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.getCredentials());
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    // deconnect of the form
    this.registerForm.reset();
  }
}

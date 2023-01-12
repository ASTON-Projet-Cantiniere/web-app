import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutes} from './auth.routing';
import {SharedModule} from '@shared/shared.module';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';
import {OrdersComponent} from './profile/orders/orders.component';
import {EditComponent} from './profile/edit/edit.component';
import {NgForOf, NgIf} from "@angular/common";
import {SignoutComponent} from './signout/signout.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AuthRoutes),
    NgForOf,
    NgIf,
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    OrdersComponent,
    EditComponent,
    SignoutComponent,
  ],
  providers: [],
})
export class AuthModule {
}

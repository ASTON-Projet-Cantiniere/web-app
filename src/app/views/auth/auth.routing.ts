import { PasswordComponent } from './profile/password/password.component';
import {Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ProfileComponent} from './profile/profile.component';
import {OrdersComponent} from "./profile/orders/orders.component";
import {AuthGuard} from '@core/guards/auth.guard';
import {EditComponent} from "@views/auth/profile/edit/edit.component";
import {SignoutComponent} from "@views/auth/signout/signout.component";

export const AuthRoutes: Routes = [
  {
    path: 'account',
    children: [
      {path: 'signin',component: SigninComponent},
      {path: 'signup',component: SignupComponent},
      {path: 'signout',component: SignoutComponent},
      {path: '**',redirectTo: 'signin'}
    ],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'profile',
    children: [
      {path: '',component: ProfileComponent},
      {path: 'edit',component: EditComponent},
      {path: 'orders',component: OrdersComponent},
      {path: 'password',component: PasswordComponent},
      {path: '**', redirectTo: ''}
    ],
    canActivateChild: [AuthGuard]
  },
];

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersManagerComponent} from './users-manager.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {UsersManagerRoutes} from "./users-manager.routing";
import { EditUserComponent } from './edit-user/edit-user.component';
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    UsersManagerComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UsersManagerRoutes),
    ReactiveFormsModule,
  ]
})
export class UsersManagerModule {
}

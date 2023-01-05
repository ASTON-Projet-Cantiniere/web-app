import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './users-manager.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersManagerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

  ]
})
export class UsersManagerModule { }

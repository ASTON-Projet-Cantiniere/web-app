import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MenusManagerComponent } from './menus-manager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddMenuComponent,
    MenusManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MenusManagerModule { }

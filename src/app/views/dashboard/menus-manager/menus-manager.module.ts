import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MenusManagerComponent } from './menus-manager.component';



@NgModule({
  declarations: [
    AddMenuComponent,
    MenusManagerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MenusManagerModule { }

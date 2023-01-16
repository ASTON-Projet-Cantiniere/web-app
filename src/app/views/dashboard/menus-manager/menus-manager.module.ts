import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddMenuComponent} from './add-menu/add-menu.component';
import {MenusManagerComponent} from './menus-manager.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MenusManagerRoutes} from "@views/dashboard/menus-manager/menus-manager-routing";

@NgModule({
  declarations: [
    AddMenuComponent,
    MenusManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MenusManagerRoutes),
  ]
})
export class MenusManagerModule {
}

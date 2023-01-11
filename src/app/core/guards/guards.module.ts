import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminGuard} from "./admin.guard";
import {AuthGuard} from "./auth.guard";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AdminGuard,
    AuthGuard
  ]
})
export class CoreGuardsModule {
}

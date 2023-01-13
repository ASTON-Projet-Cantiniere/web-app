import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BroadcasterService} from "./broadcaster.service";
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BroadcasterService,
    AuthService,
    TokenService
  ]
})
export class CoreServicesModule {
}

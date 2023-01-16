import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BroadcasterService} from "./broadcaster.service";
import {TokenService} from "./token.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BroadcasterService,
    TokenService
  ]
})
export class CoreServicesModule {
}

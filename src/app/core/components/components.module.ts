import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from "./footer/footer.component";
import {NgIf} from "@angular/common";

const classesToInclude: any[] = [
  HeaderComponent,
  FooterComponent,
];

@NgModule({
  imports: [
    RouterModule,
    NgIf,
  ],
  entryComponents: [classesToInclude],
  declarations: classesToInclude,
  exports: classesToInclude,
})
export class CoreComponentsModule {
}

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from "./footer/footer.component";
import {LoaderComponent} from "@core/components/loader/loader.component";
import {CommonModule} from "@angular/common";

const classesToInclude: any[] = [
  HeaderComponent,
  FooterComponent,
  LoaderComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  entryComponents: [classesToInclude],
  declarations: classesToInclude,
  exports: classesToInclude,
})
export class CoreComponentsModule {
}

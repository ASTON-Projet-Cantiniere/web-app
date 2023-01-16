import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {LoaderComponent} from "@core/components/loader/loader.component";
import {CommonModule} from "@angular/common";
import {BackgroundComponent} from "@core/components/background/background.component";

const classesToInclude: any[] = [
  LoaderComponent,
  BackgroundComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  entryComponents: [classesToInclude],
  declarations: classesToInclude,
  exports: [
    classesToInclude,
    BackgroundComponent
  ],
})
export class CoreComponentsModule {
}

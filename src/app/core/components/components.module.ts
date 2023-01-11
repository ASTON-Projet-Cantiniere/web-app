import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {LoaderComponent} from "@core/components/loader/loader.component";
import {CommonModule} from "@angular/common";

const classesToInclude: any[] = [
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

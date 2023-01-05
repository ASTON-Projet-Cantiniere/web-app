import {CommonModule} from '@angular/common';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthInterceptorProvider} from './interceptors/auth.interceptor';
import {CoreComponentsModule} from "./components/components.module";
import {CoreGuardsModule} from "./guards/guards.module";
import {CoreServicesModule} from "./services/services.module";

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CoreComponentsModule,
    CoreGuardsModule,
    CoreServicesModule
  ],
  providers: [
    AuthInterceptorProvider,
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by the AppModule and no-one else */
  // Note: @SkipSelf() is used to avoid circular dependency
  //  and @Optional() is used to avoid error if the module is not found
  constructor(@Optional() @SkipSelf() presentInParent: CoreModule) {
    if (presentInParent) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}

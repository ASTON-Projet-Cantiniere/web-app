import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {environment} from '@env';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    CoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: 'API_URL', useValue: environment.apiURL}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

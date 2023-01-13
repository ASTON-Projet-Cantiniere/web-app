import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {environment} from '@env';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './shared/services/set-auth-header';
import { SharedModule } from './shared/shared.module';
import { OrderComponent } from './views/order/order.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MealComponent } from './views/meal/meal.component';

import { InscriptionComponent } from './shared/components/inscription/inscription.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import { UserComponent } from './shared/components/user/user.component';
import { MealModalComponent } from './views/meal/meal-modal/meal-modal.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: 'API_URL', useValue: environment.apiURL}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

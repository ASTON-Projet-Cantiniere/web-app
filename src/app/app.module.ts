import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './shared/services/set-auth-header';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { MealComponent } from './views/meal/meal.component';
import { OrderComponent } from './views/order/order.component';
import { ReactiveFormsModule } from "@angular/forms";

import { InscriptionComponent } from './shared/components/inscription/inscription.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './shared/components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    MealComponent,
    OrderComponent,
    InscriptionComponent,
    UserComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

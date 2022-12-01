import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import {FooterComponent} from "./components/footer/footer.component";

const classesToInclude: any[] = [
  HeaderComponent,
  FooterComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [classesToInclude],
  providers: [],
  declarations: classesToInclude,
  exports: classesToInclude
})
export class SharedModule { }

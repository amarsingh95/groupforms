import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule,FormsModule }   from '@angular/forms';
import { FormElementsModule } from './form-elements/form-elements.module';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

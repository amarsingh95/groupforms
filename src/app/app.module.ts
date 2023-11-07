import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule,FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';

import { FormElementsModule } from './form-elements/form-elements.module';
import { ServicesService } from './services.service';
import { LoaderInterceptorInterceptor } from './loader-interceptor.interceptor';
import { LoaderComponent } from './loader/loader.component';




@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
  ],
  providers: [ServicesService,{provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

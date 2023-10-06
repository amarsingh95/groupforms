import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustTextComponent } from './cust-text/cust-text.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[CustTextComponent]
})
export class FormElementsModule { }

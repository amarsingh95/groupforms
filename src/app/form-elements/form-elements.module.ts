import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustTextComponent } from './cust-text/cust-text.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CustRadioComponent } from './cust-radio/cust-radio.component';
import { CustCheckboxComponent } from './cust-checkbox/cust-checkbox.component';



@NgModule({
  declarations: [
    CustTextComponent,
    CustRadioComponent,
    CustCheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[CustTextComponent,CustRadioComponent,CustCheckboxComponent]
})
export class FormElementsModule { }

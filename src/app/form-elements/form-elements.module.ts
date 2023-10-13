import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustTextComponent } from './cust-text/cust-text.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CustRadioComponent } from './cust-radio/cust-radio.component';
import { CustCheckboxComponent } from './cust-checkbox/cust-checkbox.component';
import { CustDropdownComponent } from './cust-dropdown/cust-dropdown.component';
import { CustMultiSelectFilterComponent } from './cust-multi-select-filter/cust-multi-select-filter.component';
import { CustOtpTypeComponent } from './cust-otp-type/cust-otp-type.component';
import { OnlynumberDirective } from '../onlynumber.directive';



@NgModule({
  declarations: [
    CustTextComponent,
    CustRadioComponent,
    CustCheckboxComponent,
    CustDropdownComponent,
    CustMultiSelectFilterComponent,
    CustOtpTypeComponent,
    OnlynumberDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[CustTextComponent,CustRadioComponent,CustCheckboxComponent,CustDropdownComponent,CustMultiSelectFilterComponent,CustOtpTypeComponent]
})
export class FormElementsModule { }

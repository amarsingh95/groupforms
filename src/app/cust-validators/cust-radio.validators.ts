import { AbstractControl } from "@angular/forms";

export function custRadioValidation(controls:AbstractControl)
{
    return controls?.value?.every((dt:any)=>!dt?.selected)?{selectCheckbox:true}:null; 
}
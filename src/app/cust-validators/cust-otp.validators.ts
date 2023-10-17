import { AbstractControl } from "@angular/forms";
type otpValType={
    value:string,
    text:string,
    touched:boolean 
   }

export function custOptValidation(controls:AbstractControl)
{
    return controls.value?.some((dt:otpValType)=>dt?.value==='')?{emptyOptVal:true}:null;
}
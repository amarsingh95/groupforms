import { Component,OnInit,Input,ChangeDetectionStrategy} from '@angular/core';
import { otpValType } from 'src/app/models/form.model';

@Component({
  selector: 'app-cust-otp-type',
  templateUrl: './cust-otp-type.component.html',
  styleUrls: ['./cust-otp-type.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustOtpTypeComponent implements OnInit {

 
  constructor() { }

  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  @Input()touchedValidity:boolean=false;

  ngOnInit(): void {
   
  }
  checkInputNumber(value:string):boolean
  {
    return isNaN(parseInt(value.trim()));
  }

  changeKeyUp(event:KeyboardEvent,child:HTMLElement|HTMLInputElement,optIndex:number,inputMaxLength:number,formGrp:any,formControlName:string)
  {
    
    let childElement:HTMLInputElement=child as HTMLInputElement;
    let focusPreveousElementBackSpace:HTMLElement=child.previousElementSibling as HTMLHtmlElement;
    let focusNextElement:HTMLElement=child.nextElementSibling as HTMLHtmlElement;

    let arr:Array<otpValType>=formGrp.get(formControlName)?.value;
    arr[optIndex].value=childElement?.value;
    formGrp.get(formControlName)?.setValue(arr);
    if(event.key==='Backspace' && optIndex>0)
    {
      focusPreveousElementBackSpace.focus();
    }
    if(!this.checkInputNumber(childElement?.value))
    {
      if(optIndex!==(inputMaxLength-1))
      {
        focusNextElement.focus()
      }
      
    }
  }

  onFocus(formGrp:any,formControlName:string,inputIndex:number,inputObj:HTMLInputElement)
  {
    let arr:Array<otpValType>=formGrp.get(formControlName)?.value;
    arr[inputIndex].touched=true;
    formGrp.get(formControlName)?.setValue(arr);
  }

}

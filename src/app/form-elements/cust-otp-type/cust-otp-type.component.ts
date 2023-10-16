import { Component, ElementRef, OnInit,ViewChild} from '@angular/core';

interface otpValType{
 value:string,
 text:string, 
}

@Component({
  selector: 'app-cust-otp-type',
  templateUrl: './cust-otp-type.component.html',
  styleUrls: ['./cust-otp-type.component.css']
})
export class CustOtpTypeComponent implements OnInit {

  constructor() { }
otpArr:Array<otpValType>=[
  {value:'1',text:'1'},
  {value:'2',text:'2'},
  {value:'3',text:'3'},
]

  ngOnInit(): void {
   
  }
  checkInputNumber(value:string):boolean
  {
    return isNaN(parseInt(value.trim()));
  }

  changeKeyUp(event:KeyboardEvent,child:HTMLElement|HTMLInputElement,optIndex:number,inputMaxLength:number)
  {
    let childElement:HTMLInputElement=child as HTMLInputElement;
    let focusPreveousElementBackSpace:HTMLElement=child.previousElementSibling as HTMLHtmlElement;
    let focusNextElement:HTMLElement=child.nextElementSibling as HTMLHtmlElement;

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

}

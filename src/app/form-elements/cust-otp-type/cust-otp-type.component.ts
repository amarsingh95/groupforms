import { Component, ElementRef, OnInit,ViewChild} from '@angular/core';

@Component({
  selector: 'app-cust-otp-type',
  templateUrl: './cust-otp-type.component.html',
  styleUrls: ['./cust-otp-type.component.css']
})
export class CustOtpTypeComponent implements OnInit {

  constructor() { }
@ViewChild('otp1',{ static: false })otpf:ElementRef<HTMLInputElement>={} as ElementRef;
@ViewChild('otp2',{ static: false })otps:ElementRef<HTMLInputElement>={} as ElementRef;
@ViewChild('otp3',{ static: false })otpt:ElementRef<HTMLInputElement>={} as ElementRef;
@ViewChild('otp4',{ static: false })otpfr:ElementRef<HTMLInputElement>={} as ElementRef;

  ngOnInit(): void {
  }

  changeOpt1()
  {

    if(!this.checkInputNumber(this.otpf.nativeElement?.value))
    {
      this.otps.nativeElement.focus();
    }
  }

  

  changeOpt2()
  {
    if(!this.checkInputNumber(this.otps.nativeElement?.value))
    {
      this.otpt.nativeElement.focus();
    }
    
  }

  changeOpt3()
  {
    if(!this.checkInputNumber(this.otpt.nativeElement?.value))
    {
      this.otpfr.nativeElement.focus();
    }
  }

  changeOpt4()
  {
  }

  checkInputNumber(value:string):boolean
  {
    return isNaN(parseInt(value.trim()));
  }

}

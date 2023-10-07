import { Component, ElementRef, Input, OnInit,ViewChild} from '@angular/core';

@Component({
  selector: 'app-cust-checkbox',
  templateUrl: './cust-checkbox.component.html',
  styleUrls: ['./cust-checkbox.component.css']
})
export class CustCheckboxComponent implements OnInit {

  constructor() { }
  @Input() FormGropText: any;
  @Input() FromControlNameText: string = '';
  @Input() styleText: string = '';
  @Input() displayErr: boolean = false;
  @Input() errName: string = '';
  @Input() inputValidity: boolean = false;
  @Input() labelText: string = '';
  @Input() valProp: string = '';
  @Input() selectProp: string = '';
  @Input() rdArr: any;
  checkCounter:number=0;
  ngOnInit(): void {
    
  }


  selectCheckBox(FormGropText: any, FromControlNameText: string, chIndex: number) {
    if (FormGropText?.get(FromControlNameText)?.value?.length !== undefined) {
      let arr: Array<any> = FormGropText?.get(FromControlNameText)?.value;
      arr[chIndex][this.selectProp] = !arr[chIndex][this.selectProp];
      FormGropText.get(FromControlNameText)?.setValue(arr);
    }
  }  


  getElemtentTouched(FormGropText: any, FromControlNameText: string)
  {
    this.checkCounter=this.checkCounter+1;
    if(FormGropText?.get(FromControlNameText)?.value?.length !== undefined)
    {
     return this.checkCounter===FormGropText?.get(FromControlNameText)?.value?.length 
    }
    return false
  }

  getCheckboxValidation(chkArr: Array<{ value: string, selected: boolean }>): boolean {
    return chkArr.every((dt: { value: string, selected: boolean }) => dt.selected === false)
  }


  getValidChk(FormGropText: any, FromControlNameText: string){
    return this.getElemtentTouched(FormGropText,FromControlNameText) && this.getCheckboxValidation(FormGropText?.get(FromControlNameText)?.value)
  }

}

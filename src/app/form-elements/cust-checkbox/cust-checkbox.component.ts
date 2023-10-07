import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cust-checkbox',
  templateUrl: './cust-checkbox.component.html',
  styleUrls: ['./cust-checkbox.component.css']
})
export class CustCheckboxComponent implements OnInit {

  constructor() { }
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()displayErr:boolean=false;
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  @Input()valProp:string='';
  @Input()selectProp:string='';
  @Input()rdArr:any;
  ngOnInit(): void {
  }


  selectCheckBox(FormGropText:any,FromControlNameText:string,chIndex:number)
  {
    if(FormGropText?.get(FromControlNameText)?.value?.length!==undefined)
    {
      let arr:Array<any>=FormGropText?.get(FromControlNameText)?.value;
      arr[chIndex][this.selectProp]=!arr[chIndex][this.selectProp];
      FormGropText.get(FromControlNameText)?.setValue(arr);
    }
    
  }

}

import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cust-checkbox',
  templateUrl: './cust-checkbox.component.html',
  styleUrls: ['./cust-checkbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  allTouched: boolean = false;
  ngOnInit(): void {

  }


  selectCheckBox(FormGropText: any, FromControlNameText: string, chIndex: number) {
    if (FormGropText?.get(FromControlNameText)?.value?.length !== undefined) {
      let arr: Array<any> = FormGropText?.get(FromControlNameText)?.value;
      arr[chIndex][this.selectProp] = !arr[chIndex][this.selectProp];
      FormGropText.get(FromControlNameText)?.setValue(arr);
    }
  }


  getElemtentTouched(FormGropText: any, FromControlNameText: string, chIndex: number) {
    if (chIndex === FormGropText?.get(FromControlNameText)?.value?.length - 1) {
      this.allTouched = true
    } else {
      this.allTouched = false;
    }
  }

  getCheckboxValidation(chkArr: Array<{ value: string, selected: boolean }>): boolean {
    return chkArr.every((dt: { value: string, selected: boolean }) => dt.selected === false)
  }

  getCheckboxSomeValidation(chkArr: Array<{ value: string, selected: boolean }>): boolean {
    return chkArr.some((dt: { value: string, selected: boolean }) => dt.selected === true)
  }


  getValidChk(FormGropText: any, FromControlNameText: string) {
    if(this.allTouched && this.getCheckboxValidation(FormGropText.get(FromControlNameText)?.value))
    {
      return true
    }
    return false
  }

}

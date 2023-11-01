import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {valType} from '../../models/form.model';

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
  @Input() valProp: string = '';
  @Input() selectProp: string = '';
  @Input() touchedProp: string = '';
  @Input() rdArr: any;
  @Input() inputValidity: boolean = false;
  @Input() touchedValidity: boolean = false;
  allTouched: boolean = false;
  ngOnInit(): void {

  }


  selectCheckBox(FormGropText: any, FromControlNameText: string, chIndex: number, selectProp: string, touchedProp: string) {
    this.updateValObjArr(FormGropText, FromControlNameText, chIndex, selectProp, false);
    FormGropText?.get(FromControlNameText)?.value?.map((dt: valType | any) => { dt[touchedProp] = true });
  }


  getElemtentTouched(FormGropText: any, FromControlNameText: string, chIndex: number, tcProp: string) {
    this.updateValObjArr(FormGropText, FromControlNameText, chIndex, tcProp, true);

  }

  getCheckboxSomeValidation(chkArr: Array<valType>): boolean {
    return chkArr.some((dt: valType) => dt.selected === true)
  }

  checkFormValueiSArray(FormGropText: any, FromControlNameText: string) {
    return FormGropText?.get(FromControlNameText)?.value?.length !== undefined ? true : false;
  }

  updateValObjArr(FormGropText: any, FromControlNameText: string, chIndex: number, chooseProp: string, typeFocus: boolean) {

    if (this.checkFormValueiSArray(FormGropText, FromControlNameText)) {
      let arr: Array<any> = FormGropText?.get(FromControlNameText)?.value;
      typeFocus ? arr[chIndex][chooseProp] = true : arr[chIndex][chooseProp] = !arr[chIndex][chooseProp];
      FormGropText.get(FromControlNameText)?.setValue(arr);
    }
  }



}

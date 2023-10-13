import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef,Input} from '@angular/core';


interface multiSelectType {
  value: string,
  text: string,
  selected: boolean
}
@Component({
  selector: 'app-cust-multi-select-filter',
  templateUrl: './cust-multi-select-filter.component.html',
  styleUrls: ['./cust-multi-select-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustMultiSelectFilterComponent implements OnInit {

  constructor() { }
  @ViewChild('filterTxt', { static: false }) filtxt: ElementRef<HTMLInputElement> = {} as ElementRef;
  multiArr: Array<multiSelectType> = [{value: 'One', text: 'One', selected: false}];
  isDropdownActive: boolean = false;
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  @Input()globalValueArr:Array<multiSelectType>=[];

  ngOnInit(): void {
    this.multiArr = this.getMultipleDataArr();
    this.bindMultipleSelect(this.FormGropText,this.FromControlNameText);
  }

  filterMultiSelectValue(FormGrp:any,formControlNameTxt:string) {
    if (this.filtxt?.nativeElement?.value !== '') {
      this.multiArr = this.getMultipleDataArr().filter((dt: multiSelectType) => dt?.text.toLowerCase().includes(this.filtxt?.nativeElement?.value.toLowerCase()))
    } else {
      this.multiArr = this.getMultipleDataArr();
    }
    FormGrp.get(formControlNameTxt)?.setValue(this.globalValueArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','));
  }

  getMultipleDataArr(): Array<multiSelectType> {
    return this.globalValueArr;
  }


  selectCheckbox(FormGrp:any,formControlNameTxt:string,selectVal: string) {
    if (selectVal) {
      let sIndex: number = this.multiArr.findIndex((dt: multiSelectType) => dt.value === selectVal);
      this.multiArr[sIndex].selected = !this.multiArr[sIndex].selected;
      FormGrp.get(formControlNameTxt)?.setValue(this.globalValueArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','))
    }
    console.log(this.globalValueArr)
  }


  bindMultipleSelect(FormGrp:any,formControlNameTxt:string)
  {
    if(FormGrp.get(formControlNameTxt)?.value)
    {
      let arr:Array<string>=FormGrp.get(formControlNameTxt)?.value?.split(',');
      arr?.map((dt:string)=>{
        let gIndex:number=this.globalValueArr.findIndex((dtM:multiSelectType)=>dtM?.value===dt);
        this.globalValueArr[gIndex].selected=!this.globalValueArr[gIndex]?.selected;
      })
      FormGrp.get(formControlNameTxt)?.setValue(this.globalValueArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','))
    }
  }
}

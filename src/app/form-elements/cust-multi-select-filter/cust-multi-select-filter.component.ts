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
  multiArr: Array<multiSelectType> = [];
  isDropdownActive: boolean = false;
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';


  globalValueArr: Array<multiSelectType> = [
    { value: 'One', text: 'One', selected: false },
    { value: 'Two', text: 'Two', selected: false },
    { value: 'Three', text: 'Three', selected: false },
    { value: 'Four', text: 'Four', selected: false },
    { value: 'Five', text: 'Five', selected: false },
    { value: 'Six', text: 'Six', selected: false },
  ]

  ngOnInit(): void {
    this.multiArr = this.getMultipleDataArr();
  }

  filterMultiSelectValue() {
    if (this.filtxt?.nativeElement?.value !== '') {
      this.multiArr = this.getMultipleDataArr().filter((dt: multiSelectType) => dt?.text.toLowerCase().includes(this.filtxt?.nativeElement?.value.toLowerCase()))
    } else {
      this.multiArr = this.getMultipleDataArr();
    }
  }

  getMultipleDataArr(): Array<multiSelectType> {
    return this.globalValueArr;
  }


  selectCheckbox(FormGrp:any,formControlNameTxt:string,selectVal: string) {
    if (selectVal) {
      let sIndex: number = this.multiArr.findIndex((dt: multiSelectType) => dt.value === selectVal);
      this.multiArr[sIndex].selected = !this.multiArr[sIndex].selected;
      FormGrp.get(formControlNameTxt)?.setValue(this.multiArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','))
    }
  }


  bindMultipleSelect(FormGrp:any,formControlNameTxt:string)
  {
    let arr:Array<string>=FormGrp.get(formControlNameTxt)?.value.split(',');
    arr.map((dt:string)=>{
      let gIndex:number=this.multiArr.findIndex((dtM:multiSelectType)=>dtM?.value===dt);
      this.multiArr[gIndex].selected=!this.multiArr[gIndex].selected;
    })
    FormGrp.get(formControlNameTxt)?.setValue(this.multiArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','))
  }
}

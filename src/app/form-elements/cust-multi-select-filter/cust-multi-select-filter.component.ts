import { Component, OnInit, ViewChild, ElementRef,Input,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import { Subject, debounceTime} from 'rxjs';
import {multiSelectType} from '../../models/form.model';

@Component({
  selector: 'app-cust-multi-select-filter',
  templateUrl: './cust-multi-select-filter.component.html',
  styleUrls: ['./cust-multi-select-filter.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustMultiSelectFilterComponent implements OnInit{

  constructor(private cdr:ChangeDetectorRef) { }
  @ViewChild('filterTxt', { static: false }) filtxt: ElementRef<HTMLInputElement> = {} as ElementRef;
  multiArr: Array<multiSelectType> = [{value: 'One', text: 'One', selected: false}];
  isDropdownActive: boolean = false;
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  @Input()globalValueArr:Array<multiSelectType>|any=[];
  inputSubject:Subject<string>=new Subject<string>;
  tempArr:Array<multiSelectType>=[];

  async ngOnInit(){
    this.multiArr =await this.globalValueArr;
    this.tempArr=await this.globalValueArr;
    this.inputSubject.pipe(debounceTime(11)).subscribe((dt)=>{
      this.bindMultipleSelect(this.FormGropText,this.FromControlNameText)
    })
    this.inputSubject.next('');
  }

  filterMultiSelectValue(FormGrp:any,formControlNameTxt:string) {
    if (this.filtxt?.nativeElement?.value !== '') {
      this.multiArr = this.tempArr.filter((dt: multiSelectType) => dt?.text.toLowerCase().includes(this.filtxt?.nativeElement?.value.toLowerCase()))
    } else {
      this.multiArr = this.tempArr;
    }
    FormGrp.get(formControlNameTxt)?.setValue(this.tempArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','));
  }

  selectCheckbox(FormGrp:any,formControlNameTxt:string,selectVal: string) {
    if (selectVal) {
      let sIndex: number = this.multiArr.findIndex((dt: multiSelectType) => dt.value === selectVal);
      this.multiArr[sIndex].selected = !this.multiArr[sIndex].selected;
      FormGrp.get(formControlNameTxt)?.setValue(this.tempArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','))
    }
  }


  bindMultipleSelect(FormGrp:any,formControlNameTxt:string)
  {
    if(FormGrp.get(formControlNameTxt)?.value)
    {
      let arr:Array<string>=FormGrp.get(formControlNameTxt)?.value?.split(',');
      arr?.map((dt:string)=>{
        let gIndex:number=this.multiArr.findIndex((dtM:multiSelectType)=>dtM?.value===dt);
        this.multiArr[gIndex].selected=!this.multiArr[gIndex].selected;
      })
      FormGrp.get(formControlNameTxt)?.setValue(this.tempArr?.filter((dt: multiSelectType) => dt.selected).map((dt: multiSelectType) => dt?.value)?.join(','))
    }
  }

 
}

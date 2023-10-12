import { Component, OnInit,ChangeDetectionStrategy,ViewChild, ElementRef} from '@angular/core';


interface multiSelectType{
  value:string,
  text:string,
  selected:boolean
}
@Component({
  selector: 'app-cust-multi-select-filter',
  templateUrl: './cust-multi-select-filter.component.html',
  styleUrls: ['./cust-multi-select-filter.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustMultiSelectFilterComponent implements OnInit {

  constructor() { }
  @ViewChild('filterTxt',{ static: false})filtxt:ElementRef<HTMLInputElement>={} as ElementRef;
  multiArr:Array<multiSelectType>=[];
  isDropdownActive:boolean=false;
  ddValue:string='';

  ngOnInit(): void {
    this.multiArr=this.getMultipleDataArr();
  }

  filterMultiSelectValue()
  {
    console.log(this.filtxt?.nativeElement?.value);

    if(this.filtxt?.nativeElement?.value!=='')
    {
    this.multiArr=this.getMultipleDataArr().filter((dt:multiSelectType)=>dt?.text.toLowerCase().includes(this.filtxt?.nativeElement?.value.toLowerCase()))
    }else{

      if(!this.checkSelectMultiCheckBox())
      {
        this.multiArr=this.getMultipleDataArr();
      }
      
    }
  
  }

  getMultipleDataArr():Array<multiSelectType>
  {
    return [
      {value:'One',text:'One',selected:false},
      {value:'Two',text:'Two',selected:false},
      {value:'Three',text:'Three',selected:false},
      {value:'Four',text:'Four',selected:false},
      {value:'Five',text:'Five',selected:false},
      {value:'Six',text:'Six',selected:false},
    ]
  }


  selectCheckbox(selectVal:string)
  {
    if(selectVal)
    {
      let sIndex:number=this.multiArr.findIndex((dt:multiSelectType)=>dt.value===selectVal);
      this.multiArr[sIndex].selected=!this.multiArr[sIndex].selected;
      this.multiArr?.filter((dt:multiSelectType)=>dt.selected).map((dt:multiSelectType)=>dt?.value)?.join(',')
      this.ddValue=this.multiArr?.filter((dt:multiSelectType)=>dt.selected).map((dt:multiSelectType)=>dt?.value)?.join(',');
      
    }
    console.log(this.multiArr);
  }


  checkSelectMultiCheckBox()
  {
    return this.multiArr?.some((dt:multiSelectType)=>dt.selected)
  }
}

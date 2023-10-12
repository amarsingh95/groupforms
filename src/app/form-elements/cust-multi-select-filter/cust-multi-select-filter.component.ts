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
  globalValueArr:Array<multiSelectType>=[
    {value:'One',text:'One',selected:false},
    {value:'Two',text:'Two',selected:false},
    {value:'Three',text:'Three',selected:false},
    {value:'Four',text:'Four',selected:false},
    {value:'Five',text:'Five',selected:false},
    {value:'Six',text:'Six',selected:false},
  ]

  ngOnInit(): void {
    this.multiArr=this.getMultipleDataArr();
  }

  filterMultiSelectValue()
  {
    // console.log(this.filtxt?.nativeElement?.value);

    if(this.filtxt?.nativeElement?.value!=='')
    {
      
      this.multiArr=this.getMultipleDataArr().filter((dt:multiSelectType)=>dt?.text.toLowerCase().includes(this.filtxt?.nativeElement?.value.toLowerCase()))

    }else{

      if(!this.checkSelectMultiCheckBox())
      {
        this.multiArr=this.getMultipleDataArr();
      }
      
    }
  console.log(this.multiArr)
  }

  getMultipleDataArr():Array<multiSelectType>
  {
    return this.globalValueArr;
  }


  selectCheckbox(selectVal:string)
  {
    if(selectVal)
    {
      let sIndex:number=this.multiArr.findIndex((dt:multiSelectType)=>dt.value===selectVal);
      this.multiArr[sIndex].selected=!this.multiArr[sIndex].selected;
      let gIndex:number=this.globalValueArr.findIndex((dt:multiSelectType)=>dt.value===selectVal);
      console.log(gIndex);
      console.log(this.globalValueArr[gIndex])
      // this.globalValueArr[gIndex].selected=!this.globalValueArr[gIndex].selected;
      // this.globalValueArr[gIndex].selected=!this.globalValueArr[gIndex].selected;
      // if(this.globalValueArr[gIndex].selected){
      //   this.globalValueArr[gIndex].selected=false
      // }else{
      //   this.globalValueArr[gIndex].selected=true;
      // }
      this.multiArr?.filter((dt:multiSelectType)=>dt.selected).map((dt:multiSelectType)=>dt?.value)?.join(',')
      this.ddValue=this.multiArr?.filter((dt:multiSelectType)=>dt.selected).map((dt:multiSelectType)=>dt?.value)?.join(','); 
    }
    console.log(this.globalValueArr)
  }


  checkSelectMultiCheckBox()
  {
    return this.multiArr?.some((dt:multiSelectType)=>dt.selected)
  }
}

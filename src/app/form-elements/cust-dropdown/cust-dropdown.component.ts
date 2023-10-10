import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-cust-dropdown',
  templateUrl: './cust-dropdown.component.html',
  styleUrls: ['./cust-dropdown.component.css']
})
export class CustDropdownComponent implements OnInit {

  constructor() { }
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  @Input()dataArr:Array<{text:string,value:string}>=[]


  ngOnInit(): void {
  }

}

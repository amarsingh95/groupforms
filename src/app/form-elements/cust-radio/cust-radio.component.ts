import { Component, OnInit,Input,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-cust-radio',
  templateUrl: './cust-radio.component.html',
  styleUrls: ['./cust-radio.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustRadioComponent implements OnInit {

  constructor() { }
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()displayErr:boolean=false;
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  @Input()rdArr:any;

  ngOnInit(): void {
  }

  

}

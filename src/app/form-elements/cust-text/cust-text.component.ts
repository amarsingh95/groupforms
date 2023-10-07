import { Component, OnInit,Input,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-cust-text',
  templateUrl: './cust-text.component.html',
  styleUrls: ['./cust-text.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustTextComponent implements OnInit {

  constructor(private cdr:ChangeDetectorRef) { }
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  @Input()displayErr:boolean=false;
  @Input()errName:string='';
  @Input()inputValidity:boolean=false;
  @Input()labelText:string='';
  ngOnInit(): void {

  }
 


}

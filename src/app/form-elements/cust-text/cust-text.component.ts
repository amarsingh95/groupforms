import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-cust-text',
  templateUrl: './cust-text.component.html',
  styleUrls: ['./cust-text.component.css']
})
export class CustTextComponent implements OnInit {

  constructor() { }
  @Input()FormGropText:any;
  @Input()FromControlNameText:string='';
  @Input()styleText:string='';
  ngOnInit(): void {

  }

}

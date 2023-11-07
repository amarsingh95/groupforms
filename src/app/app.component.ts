import { Component,OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nested-forms';
  load:boolean=true;
  constructor(private service:ServicesService){}
  
  ngOnInit(): void {
   this.loading();   
  }

  loading()
  {
    this.service.loadingSpinner.pipe(delay(0)).subscribe((loadingValue)=>{
      this.load=loadingValue;
    })
  }
}

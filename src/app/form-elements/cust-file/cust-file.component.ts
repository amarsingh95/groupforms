import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-cust-file',
  templateUrl: './cust-file.component.html',
  styleUrls: ['./cust-file.component.css']
})
export class CustFileComponent implements OnInit {

  constructor(private services: ServicesService) { }
  @Input() FormGropText: any;
  @Input() FromControlNameText: string = '';
  @Input() styleText: string = '';
  @Input() displayErr: boolean = false;
  @Input() errName: string = '';
  @Input() inputValidity: boolean = false;
  @Input() labelText: string = '';
  @Input() multiple: boolean = false;
  imgSrc: Array<any> = [];
  imgName:Array<string>=[]

  ngOnInit(): void {

  }

  getFileValue(event: any, checkMulti: boolean) {
    this.imgName=[];
    if (checkMulti) {
      let file = event.target?.files;
      let fileArr:Array<any>=Array.from(file);
      fileArr.map((dt:any)=>{
        this.setFileValue(dt);
      })
      
    } else {
      let file: File = event.target?.files[0];
      this.setFileValue(file);
    }

  }


  setFileValue(file: File) {
    let formData = new FormData();
    formData.append('files', file);
    this.imgName.push(file.name);
    this.services.saveFile(formData)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgSrc.push(reader.result);
    }
  }

}

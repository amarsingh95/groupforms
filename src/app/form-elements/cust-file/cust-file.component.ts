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

  ngOnInit(): void {

  }

  getFileValue(event: any, checkMulti: boolean) {
    if (checkMulti) {
      let file = event.target?.files;
      for (let i = 0; i < file.length; i++) {
        this.setFileValue(file[i]);
      }
    } else {
      let file: File = event.target?.files[0];
      this.setFileValue(file);
    }

  }


  setFileValue(file: File) {
    let formData = new FormData();
    formData.append('files', file);
    this.services.saveFile(formData)
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgSrc.push(reader.result);
    }
  }

}

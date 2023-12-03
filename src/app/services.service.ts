import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,map, of, tap,catchError} from 'rxjs';
import {fileType} from './models/form.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }
  loadingSpinner:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  private loadingUrlMap:Map<string,boolean>= new Map<string,boolean>();

  getUniversityStudentsInfo()
  {
   return  of({
    "uname": "Pune University",
    "department": [
      {
        "dname": "Information Technology",
        "students": [
          {
            "firstname": "Amar",
            "lastname": "Singh",
            "email": "amarsinf23@esd.com",
            "gender": "Female",
            "language": [
              {
                "value": "Hindi",
                "selected": true,
                "touched": true
              },
              {
                "value": "Marathi",
                "selected": true,
                "touched": true
              },
              {
                "value": "English",
                "selected": false,
                "touched": true
              }
            ],
            "country": "USA",
            "topics":"One,Three,Four,Six,Two",
            "otp": [
              {
                "text": '1',
                "value": "4",
                "touched": true
              },
              {
                "text": '2',
                "value": "1",
                "touched": true
              },
              {
                "text": '3',
                "value": "8",
                "touched": true
              },
               {
                "text": '4',
                "value": "6",
                "touched": true
              }
            ],
            "subject": [
              {
                "subname": "Cybersecurity"
              },
              {
                "subname": "Data Structure"
              },
              {
                "subname": "Graphics"
              }
            ]
          }
        ]
      },
      {
        "dname": "Civil",
        "students": [
          {
            "firstname": "Alakh",
            "lastname": "Singh",
            "email": "alakh12@sadas.com",
            "gender": "Male",
            "language": [
              {
                "value": "Hindi",
                "selected": false,
                "touched": true
              },
              {
                "value": "Marathi",
                "selected": false,
                "touched": true
              },
              {
                "value": "English",
                "selected": true,
                "touched": true
              }
            ],
            "country": "India",
            "topics":"Eleven,Twelve",
            "otp": [
              {
                "text": '1',
                "value": "3",
                "touched": true
              },
              {
                "text": '2',
                "value": "8",
                "touched": true
              },
              {
                "text": '3',
                "value": "5",
                "touched": true
              },
               {
                "text": '4',
                "value": "1",
                "touched": true
              }
            ],
            "subject": [
              {
                "subname": "Mehcanics"
              }
            ]
          },
          {
            "firstname": "Anaal",
            "lastname": "Singh",
            "email": "anaal12@sadas.com",
            "gender": "Others",
            "language": [
              {
                "value": "Hindi",
                "selected": false,
                "touched": true
              },
              {
                "value": "Marathi",
                "selected": false,
                "touched": true
              },
              {
                "value": "English",
                "selected": true,
                "touched": true
              }
            ],
            "country": "India",
            "topics":"Eleven,Twelve,One",
            "otp": [
              {
                "text": '1',
                "value": "3",
                "touched": true
              },
              {
                "text": '2',
                "value": "8",
                "touched": true
              },
              {
                "text": '3',
                "value": "5",
                "touched": true
              },
               {
                "text": '4',
                "value": "1",
                "touched": true
              }
            ],
            "subject": [
              {
                "subname": "Mehcanics"
              }
            ]
          }
        ]
      }
    ]
  })
  }



  saveFile(formData:any)
  {
    console.log(formData.get('files'));
  }


  getFileImageUrl()
  {
    return this.http.get<fileType[]>(environment.IMAGEURL).
    pipe(
      map((dt:fileType[])=>dt?.filter((data:fileType)=>data?.id<10).map((data:fileType)=>data?.thumbnailUrl))
    );
  }


  setLoading(url:string,loading:boolean)
  {
    if(loading)
    {
      this.loadingSpinner.next(true);
      this.loadingUrlMap.set(url,loading)
    }else if(!loading && this.loadingUrlMap.has(url))
    {
      this.loadingUrlMap.delete(url);
    }
    if(this.loadingUrlMap.size===0)
    {
      this.loadingSpinner.next(loading)
    }
    
  }

  getMaster(endpoint:string)
  {
    return this.http.get(`${environment.BASEURL}${endpoint}`).pipe(catchError((err)=>of('Some thing when wrong')));
  }


  postData(endPoint:string,data:any)
  {console.log(data)
    return this.http.post(`${environment.BASEURL}${endPoint}`,data).pipe(catchError((err)=>of('Some thing when wrong')));
  }


}

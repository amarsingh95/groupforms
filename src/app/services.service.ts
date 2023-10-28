import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

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
            "gender": "Male",
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
        "dname": "Mumbai",
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
          }
        ]
      }
    ]
  })
  }


  
}

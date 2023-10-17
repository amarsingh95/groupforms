import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { custRadioValidation } from '../cust-validators/cust-radio.validators';
import { custOptValidation } from '../cust-validators/cust-otp.validators';

type multiSelectType={
  value: string,
  text: string,
  selected: boolean
}


type University=
{
  uname:string,
  department:Department[]
}
type Department={
  dname:string,
  students:Student[]
}

type Student={
  firstname:string,
  lastname:string,
  email:string,
  gender:string,
  country:string,
  topics:string,
  language:Language[],
  subject:Subject[]
  otp:otpValType[]
}

type Subject ={
  subname:string 
}

type Language={
    value:string,
    selected:boolean,
    touched:boolean
}


type otpValType={
  value:string,
  text:string,
  touched:boolean 
 }




@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  genderArr: Array<string> = ['Male', 'Female', 'Others'];
  countryArr: Array<{ text: string, value: string }> = [
    { text: 'India', value: 'India' },
    { text: 'China', value: 'China' },
    { text: 'Russia', value: 'Russia' },
    { text: 'USA', value: 'USA' },
    { text: 'Brazil', value: 'Brazil' },
    { text: 'Japan', value: 'Japan' },
    { text: 'Israel', value: 'Israel' },
  ]

  //Three Level Nested dynamic form
  university: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.university = this.fb.group({
      uname: ['', [Validators.required]],
      department: this.fb.array([this.createDepartment()])
    })
  
    this.bindingFormData();
  
  }



  getTopicArr():Array<multiSelectType>
{
  return [
    { value: 'One', text: 'One', selected: false },
    { value: 'Two', text: 'Two', selected: false },
    { value: 'Three', text: 'Three', selected: false },
    { value: 'Four', text: 'Four', selected: false },
    { value: 'Five', text: 'Five', selected: false },
    { value: 'Six', text: 'Six', selected: false },
    { value: 'Seven', text: 'Seven', selected: false },
    { value: 'Eight', text: 'Eight', selected: false },
    { value: 'Nine', text: 'Nine', selected: false },
    { value: 'Ten', text: 'Ten', selected: false },
    { value: 'Eleven', text: 'Eleven', selected: false },
    { value: 'Twelve', text: 'Twelve', selected: false },
  ]
}

  bindingFormData()
  {
    let data:University = {
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
                  "selected": true,
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
    }



    data?.department?.map((dt:Department,dtIndex:number)=>{
      if(dtIndex!==0)
      {
        this.addDepartment();
      }
      dt?.students?.map((ds:Student,dsIndex:number)=>{
       if(dsIndex!==0)
       {
        this.addStudent(dtIndex);
       } 
        ds?.subject?.map((dsub:Subject,dsubIndex:number)=>{
          if(dsubIndex!==0)
          {
            this.addSubjects(dtIndex,dsIndex)
          }
        })
      })
    })

    this.university.setValue(data);
    this.setValidatorsTouchedSaveC('language');
    this.setValidatorsTouchedSaveC('otp');
    this.university.markAllAsTouched();
  }

  get department() {
    return this.university.get('department') as FormArray;
  }

  createDepartment() {
    return this.fb.group({
      dname: ['', [Validators.required]],
      students: this.fb.array([this.createStudent()])
    })
  }

  createStudent() {
    return this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(10)]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      language: [[
        { value: 'Hindi', selected: false, touched: false },
        { value: 'Marathi', selected: false, touched: false },
        { value: 'English', selected: false, touched: false }], [Validators.required, custRadioValidation]],
      country: ['', [Validators.required]],
      otp:[[
      {text:'1',value:'',touched:false},
      {text:'2',value:'',touched:false},
      {text:'3',value:'',touched:false},
      {text:'4',value:'',touched:false}],[Validators.required,custOptValidation]],
      topics:['',[Validators.required]],
      subject: this.fb.array([this.createSubjects()])
    })
  }

  createSubjects() {
    return this.fb.group({
      subname: ['', [Validators.required]]
    })
  }

  addDepartment() {
    let department = this.university.get('department') as FormArray; 
     department.push(this.createDepartment())
  }


  students(departmentIndex: number) {
    return this.department.at(departmentIndex)?.get('students') as FormArray;
  }

  addStudent(departmentIndex: number) {
      this.students(departmentIndex).push(this.createStudent())
  }

  subjects(departmentIndex: number, studentIndex: number) {
    return this.students(departmentIndex)?.at(studentIndex)?.get('subject') as FormArray;
  }

  addSubjects(departmentIndex: number, studentIndex: number) {
    this.subjects(departmentIndex, studentIndex)?.push(this.createSubjects());
  }

  lang(departmentIndex: number, studentIndex: number) {
    return this.students(departmentIndex)?.at(studentIndex)?.get('lang') as FormArray;
  }


  removeDepartment(dIndex: number) {
    this.department.removeAt(dIndex);
  }

  removeStudent(dIndex: number, studIndex: number) {
    this.students(dIndex).removeAt(studIndex);
  }

  removeSubject(dIndex: number, studIndex: number, subIndex: number) {
    this.subjects(dIndex, studIndex).removeAt(subIndex);
  }

  validateControls(FormGrp: any, formControlNameTxt: string) {
    if (FormGrp.get(formControlNameTxt).touched && FormGrp.get(formControlNameTxt).invalid)
      return true
    return false
  }

  hasError(FormGrp: any, formControlNameTxt: string, errName: string) {
    if (FormGrp.get(formControlNameTxt).hasError(errName))
      return true
    return false
  }

  getFormValidity(FormGrp: any, formControlNameTxt: string, errName: string, chkType: boolean) {
    return this.validateControls(FormGrp, formControlNameTxt) && this.hasError(FormGrp, formControlNameTxt, errName)
  }


  getChkBoxtounchedControlsC(FormGrp: any, formControlName: string):boolean {
    return FormGrp.get(formControlName)?.value?.every((dt: any) => dt?.touched)
  }

  setValidatorsTouchedSaveC(formControlTxtName: string) {
    this.department.controls?.map((dt: any, di: number) => {
      dt?.controls?.students?.controls?.map((dts: any, dtsI: number) => {
        let arr: Array<any> = dts?.get(formControlTxtName)?.value;
        arr?.map((dd: any) => {
          Object.assign(dd, { touched: true })
        })
        dts?.get(formControlTxtName).setValue(arr);
      })
    })
  }

  getOptBoxtouched(FormGrp: any, formControlName: string):boolean
  {
    return  FormGrp?.get(formControlName)?.value?.every((dt:otpValType)=>dt?.touched);
  }

  setOtpValidatorsTouchedSaveC(formControlTxtName: string) {
    this.department.controls?.map((dt: any, di: number) => {
      dt?.controls?.students?.controls?.map((dts: any, dtsI: number) => {
        let arr: Array<any> = dts?.get(formControlTxtName)?.value;
        arr?.map((dd: any) => {
          Object.assign(dd, { touched: true })
        })
        dts?.get(formControlTxtName).setValue(arr);
      })
    })
  }

  getMarkedFromWithOtp()
  {
    
  }


  saveUniversity() {
    console.log(this.university)
      console.log(this.university?.value)
    if (this.university.invalid) {
      this.university.markAllAsTouched();
      this.setValidatorsTouchedSaveC('language');
      this.setValidatorsTouchedSaveC('otp');

    } else {
      // console.log(this.university)
      // console.log(this.university?.value)
    }
  }


}

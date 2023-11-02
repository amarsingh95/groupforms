import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { custRadioValidation } from '../cust-validators/cust-radio.validators';
import { custOptValidation } from '../cust-validators/cust-otp.validators';
import { ServicesService } from '../services.service';
import { lastValueFrom } from 'rxjs';
import {multiSelectType,University,Department,Student,Subject,Language,otpValType} from '../models/form.model';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private fb: FormBuilder,private service:ServicesService) { }

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
  
    // this.bindingFormData();
  
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

  async bindingFormData()
  {

    let data:University = await lastValueFrom(this.service.getUniversityStudentsInfo())

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
      firstname: ['', [Validators.required, Validators.maxLength(45),Validators.pattern(/^[A-Za-z]+$/)]],
      lastname: ['', [Validators.required,Validators.maxLength(45),Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required,Validators.email]],
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
      subject: this.fb.array([this.createSubjects()]),
      documents:['',[Validators.required]]
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
    // if (FormGrp.get(formControlNameTxt).hasError(errName))
    if (FormGrp.get(formControlNameTxt).error!==null)
      return true
    return false
  }

  getFormValidity(FormGrp: any, formControlNameTxt: string, errName: string, chkType: boolean) {
    return this.validateControls(FormGrp, formControlNameTxt) && this.hasError(FormGrp, formControlNameTxt, errName)
  }

  getTxtErrorType(FormGrp: any, formControlNameTxt: string)
  {
    let err:string=FormGrp.get(formControlNameTxt).errors!==null?Object.keys(FormGrp.get(formControlNameTxt).errors)[0]:'Appropriate';
    return this.getExactErrorName(err);
  }

  getExactErrorName(err:string):string
  {
    let errorName:string=err;
    switch(errorName)
    {
      case 'required':errorName='Field is Mandatory'
      break;
      case 'maxlength':errorName='Exceeds Number of Character'
      break;
      case 'pattern':errorName='Please Enter Valid Pattern'
      break;
      case 'email':errorName='Please Enter Email Address'
      break;
      case 'selectCheckbox':errorName='Please Select Atleast One Checkbox'
      break;
      default:
    }
    return errorName;
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

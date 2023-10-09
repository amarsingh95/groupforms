import { Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FormsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  genderArr:Array<string>=['Male','Female','Others']
  langArr:Array<{value:string,selected:boolean,touched:boolean}>=[
    {value:'Hindi',selected:false,touched:false},
  {value:'Marathi',selected:false,touched:false},
  {value:'English',selected:false,touched:false}]


  //Three Level Nested dynamic form
  university: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.university = this.fb.group({
      uname: ['', [Validators.required]],
      department: this.fb.array([this.createDepartment()])
    })
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

    let lanArr:Array<any>=[];
    this.langArr.map((dt:any)=>{
      console.log(dt)
      lanArr.push(this.fb.control(dt))
    })  
    return this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender:['',[Validators.required]],
      language:[[
      {value:'Hindi',selected:false,touched:false},
      {value:'Marathi',selected:false,touched:false},
      {value:'English',selected:false,touched:false}],[Validators.required]],
      lang:this.fb.array(lanArr),
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
    return this.department.at(departmentIndex).get('students') as FormArray;
  }

  addStudent(departmentIndex: number) {
    this.students(departmentIndex).push(this.createStudent())
  }

  subjects(departmentIndex: number, studentIndex: number) {
    return this.students(departmentIndex).at(studentIndex).get('subject') as FormArray;
  }

  addSubjects(departmentIndex: number, studentIndex: number) {
    this.subjects(departmentIndex, studentIndex).push(this.createSubjects())
  }

  lang(departmentIndex: number, studentIndex: number)
  {
    return this.students(departmentIndex).at(studentIndex).get('lang') as FormArray;
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


  saveUniversity() {
    console.log(this.university);
    console.log(this.university.valid);
    console.log(this.university.value);
    if (this.university.invalid) {
      this.university.markAllAsTouched();
      console.log('Form validtity is ' + this.university.valid)
    } else {
      console.log('Form validtity is ' + this.university.valid)
    }
  }


  validateControls(FormGrp: any, formControlNameTxt: string) {
    if (FormGrp.get(formControlNameTxt).touched && FormGrp.get(formControlNameTxt).invalid)
      return true
    return false
  }

  hasError(FormGrp: any, formControlNameTxt: string,errName:string) {
    if(FormGrp.get(formControlNameTxt).hasError(errName))
    return true
  return false
  }

  getFormValidity(FormGrp: any, formControlNameTxt: string,errName:string,chkType:boolean){
    return this.validateControls(FormGrp, formControlNameTxt) && this.hasError(FormGrp, formControlNameTxt,errName)
  }

  getCheckboxValidation(chkArr: Array<{ value: string, selected: boolean }>): boolean {
    return chkArr.every((dt: { value: string, selected: boolean }) => dt.selected === false)
  }

  getChkControls(chkObj:any)
  {
    console.log(chkObj?.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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
    return this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
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

  getFormValidity(FormGrp: any, formControlNameTxt: string,errName:string){

    return this.validateControls(FormGrp, formControlNameTxt) && this.hasError(FormGrp, formControlNameTxt,errName)
  }
}

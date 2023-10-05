import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder,FormGroup} from '@angular/forms'
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  //Three Level Nested dynamic form
  university:FormGroup=new FormGroup({});

  ngOnInit(): void {
    this.university=this.fb.group({
      uname:['',[]],
      department:this.fb.array([this.createDepartment()])
    })
  }

  get department()
  {
    return this.university.get('department') as FormArray;
  }

  createDepartment()
  {
    return this.fb.group({
      dname:['',[]],
      students:this.fb.array([this.createStudent()])
    })
  }

  createStudent()
  {
    return this.fb.group({
      firstname:['',[]],
      lastname:['',[]],
      email:['',[]],
      subject:this.fb.array([this.createSubjects()])
    })
  }

  createSubjects(){
    return this.fb.group({
      subname:['',[]]
    })
  }

  addDepartment()
  {  
    let department=this.university.get('department') as FormArray;
   department.push(this.createDepartment()) 
  }

  


  students(departmentIndex:number)
  {
    return this.department.at(departmentIndex).get('students') as FormArray;
  }

  addStudent(departmentIndex:number)
  {
    this.students(departmentIndex).push(this.createStudent())
  }

  subjects(departmentIndex:number,studentIndex:number)
  { 
   return this.students(departmentIndex).at(studentIndex).get('subject') as FormArray; 
  }

  addSubjects(departmentIndex:number,studentIndex:number)
  { 
    this.subjects(departmentIndex,studentIndex).push(this.createSubjects())
  }

  displayValue()
  {
    console.log(this.university.value);
  }
}

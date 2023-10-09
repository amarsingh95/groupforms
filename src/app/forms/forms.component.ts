import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  genderArr: Array<string> = ['Male', 'Female', 'Others']
  langArr: Array<{ value: string, selected: boolean, touched: boolean }> = [
    { value: 'Hindi', selected: false, touched: false },
    { value: 'Marathi', selected: false, touched: false },
    { value: 'English', selected: false, touched: false }]
  chkIndex: number | undefined;


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

    let lanArr: Array<any> = [];
    this.langArr.map((dt: any) => {
      lanArr.push(this.fb.control(dt))
    })
    return this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      language: [[
        { value: 'Hindi', selected: false, touched: false },
        { value: 'Marathi', selected: false, touched: false },
        { value: 'English', selected: false, touched: false }], [Validators.required]],
      lang: this.fb.array(lanArr),
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

  lang(departmentIndex: number, studentIndex: number) {
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

  getChkBoxtounchedFocus(dIndex: number, studIndex: number, lanIndex: number) {
    this.lang(dIndex, studIndex)?.value?.map((dt: any, di: number) => {
      lanIndex === di ? Object.assign(dt, { touched: true }) : ''
    })
  }


  getChkBoxCahngeVal(dIndex: number, studIndex: number, lanIndex: number) {
    this.lang(dIndex, studIndex)?.value?.map((dt: any, di: number) => {
      lanIndex === di ? Object.assign(dt, { selected: !dt?.selected }) : ''
    })
  }

  getChkBoxtounchedControls(dIndex: number, studIndex: number) {
    return this.lang(dIndex, studIndex)?.value?.every((dt: any) => dt?.touched)
  }

  getChkBoxValidControls(dIndex: number, studIndex: number) {
    return this.lang(dIndex, studIndex)?.value?.every((dt: any) => !dt?.selected)
  }

  setChkValidatorsTouchedSave() {
    this.department.controls?.map((dt: any, di: number) => {
      dt?.controls?.students?.controls?.map((dts: any, dtsI: number) => {
        dts?.controls?.lang.value?.map((dl: any, dli: number) => {
          this.getChkBoxtounchedFocus(di, dtsI, dli);
        })
      })
    })
  }



  ///My code
  getChkBoxtounchedControlsC(FormGrp: any, formControlName: string) {
    return FormGrp.get(formControlName)?.value?.every((dt: any) => dt?.touched)
  }

  getChkBoxValidControlsC(FormGrp: any, formControlName: string) {
    return FormGrp.get(formControlName)?.value?.every((dt: any) => !dt?.selected)
  }


  setChkValidatorsTouchedSaveC() {
    this.department.controls?.map((dt: any, di: number) => {
      dt?.controls?.students?.controls?.map((dts: any, dtsI: number) => {
        let arr: Array<any> = dts?.get('language')?.value;
        arr?.map((dd: any) => {
          Object.assign(dd, { touched: true })
        })
        dts?.get('language').setValue(arr);
      })
    })
  }

  saveUniversity() {
    if (this.university.invalid) {
      this.university.markAllAsTouched();
      this.setChkValidatorsTouchedSave();
      this.setChkValidatorsTouchedSaveC();
    } else {
    }
  }


}

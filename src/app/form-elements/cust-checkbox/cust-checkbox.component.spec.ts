import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCheckboxComponent } from './cust-checkbox.component';

describe('CustCheckboxComponent', () => {
  let component: CustCheckboxComponent;
  let fixture: ComponentFixture<CustCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

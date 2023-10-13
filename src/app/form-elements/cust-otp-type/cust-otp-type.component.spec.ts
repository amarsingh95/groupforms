import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOtpTypeComponent } from './cust-otp-type.component';

describe('CustOtpTypeComponent', () => {
  let component: CustOtpTypeComponent;
  let fixture: ComponentFixture<CustOtpTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOtpTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOtpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

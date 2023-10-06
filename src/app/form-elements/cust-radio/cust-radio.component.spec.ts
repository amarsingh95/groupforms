import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustRadioComponent } from './cust-radio.component';

describe('CustRadioComponent', () => {
  let component: CustRadioComponent;
  let fixture: ComponentFixture<CustRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

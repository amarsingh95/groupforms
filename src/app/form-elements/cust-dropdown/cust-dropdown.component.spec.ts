import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustDropdownComponent } from './cust-dropdown.component';

describe('CustDropdownComponent', () => {
  let component: CustDropdownComponent;
  let fixture: ComponentFixture<CustDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

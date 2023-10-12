import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustMultiSelectFilterComponent } from './cust-multi-select-filter.component';

describe('CustMultiSelectFilterComponent', () => {
  let component: CustMultiSelectFilterComponent;
  let fixture: ComponentFixture<CustMultiSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustMultiSelectFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustMultiSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

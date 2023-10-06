import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTextComponent } from './cust-text.component';

describe('CustTextComponent', () => {
  let component: CustTextComponent;
  let fixture: ComponentFixture<CustTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

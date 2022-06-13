import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentprocessComponent } from './paymentprocess.component';

describe('PaymentprocessComponent', () => {
  let component: PaymentprocessComponent;
  let fixture: ComponentFixture<PaymentprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentprocessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

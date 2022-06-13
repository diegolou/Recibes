import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentresultComponent } from './paymentresult.component';

describe('PaymentresultComponent', () => {
  let component: PaymentresultComponent;
  let fixture: ComponentFixture<PaymentresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentresultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

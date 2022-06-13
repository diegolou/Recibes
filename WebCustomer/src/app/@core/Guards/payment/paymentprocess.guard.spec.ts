import { TestBed } from '@angular/core/testing';

import { PaymentprocessGuard } from './paymentprocess.guard';

describe('PaymentprocessGuard', () => {
  let guard: PaymentprocessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaymentprocessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

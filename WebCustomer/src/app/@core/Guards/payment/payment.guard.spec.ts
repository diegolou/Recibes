import { TestBed } from '@angular/core/testing';

import { PaymentGuard } from './payment.guard';

describe('Payment.GuardService', () => {
  let service: PaymentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

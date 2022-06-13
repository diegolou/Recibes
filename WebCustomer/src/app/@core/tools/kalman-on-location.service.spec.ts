import { TestBed } from '@angular/core/testing';

import { KalmanOnLocationService } from './kalman-on-location.service';

describe('KalmanOnLocationService', () => {
  let service: KalmanOnLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KalmanOnLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OdistanceService } from './odistance.service';

describe('OdistanceService', () => {
  let service: OdistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

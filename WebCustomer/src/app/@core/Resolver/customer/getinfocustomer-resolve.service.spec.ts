import { TestBed } from '@angular/core/testing';

import { GetinfocustomerResolveService } from './getinfocustomer-resolve.service';

describe('GetinfocustomerResolveService', () => {
  let service: GetinfocustomerResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetinfocustomerResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

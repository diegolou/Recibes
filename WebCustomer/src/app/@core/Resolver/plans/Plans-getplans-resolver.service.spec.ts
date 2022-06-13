import { TestBed } from '@angular/core/testing';

import { PlansGetPlansResolverService } from './Plans-getplans-resolver.service';

describe('ParametersPlansResolverService', () => {
  let service: PlansGetPlansResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansGetPlansResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

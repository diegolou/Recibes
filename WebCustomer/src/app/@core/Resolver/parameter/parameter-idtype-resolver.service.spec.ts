import { TestBed } from '@angular/core/testing';

import { ParameterIdTypeResolverService } from './parameter-idtype-resolver.service';

describe('ParameterResolverService', () => {
  let service: ParameterIdTypeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterIdTypeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StatepackageresolverService } from './statepackage-resolver.service';

describe('StatepackageresolverService', () => {
  let service: StatepackageresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatepackageresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

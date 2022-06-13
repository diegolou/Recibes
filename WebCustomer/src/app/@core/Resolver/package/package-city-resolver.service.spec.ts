import { TestBed } from '@angular/core/testing';

import { PackageCityResolverService } from './package-city-resolver.service';

describe('PacksgeCityResolverService', () => {
  let service: PackageCityResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageCityResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PackageTypeResolverService } from './package-type-resolver.service';

describe('PackageTypeResolverService', () => {
  let service: PackageTypeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTypeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

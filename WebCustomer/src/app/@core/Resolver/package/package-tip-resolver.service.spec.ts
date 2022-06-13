import { TestBed } from '@angular/core/testing';

import { PackageTipResolverService } from './package-tip-resolver.service';

describe('PackageTipResolverService', () => {
  let service: PackageTipResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageTipResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

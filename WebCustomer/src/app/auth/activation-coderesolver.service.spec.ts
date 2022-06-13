import { TestBed } from '@angular/core/testing';

import { ActivationCoderesolverService } from './activation-coderesolver.service';

describe('ActivationCoderesolverService', () => {
  let service: ActivationCoderesolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivationCoderesolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

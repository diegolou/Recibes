import { TestBed } from '@angular/core/testing';

import { StoragelocalService } from './storagelocal.service';

describe('StorageService', () => {
  let service: StoragelocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragelocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

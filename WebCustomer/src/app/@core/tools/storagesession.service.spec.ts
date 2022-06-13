import { TestBed } from '@angular/core/testing';

import { StoragesessionService } from './storagesession.service';

describe('StoragesessionService', () => {
  let service: StoragesessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoragesessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

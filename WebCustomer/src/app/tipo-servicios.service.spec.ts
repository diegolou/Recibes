import { TestBed } from '@angular/core/testing';

import { TipoServiciosService } from './tipo-servicios.service';

describe('TipoServiciosService', () => {
  let service: TipoServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

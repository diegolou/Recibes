import { TestBed } from '@angular/core/testing';

import { MediosTransporteService } from './medios-transporte.service';

describe('MediosTransporteService', () => {
  let service: MediosTransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediosTransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

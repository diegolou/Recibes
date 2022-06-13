import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoServiciosComponent } from './tipo-servicios.component';

describe('TipoServiciosComponent', () => {
  let component: TipoServiciosComponent;
  let fixture: ComponentFixture<TipoServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipoServiciosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

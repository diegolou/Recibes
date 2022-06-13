import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pruebas1Component } from './pruebas1.component';

describe('Pruebas1Component', () => {
  let component: Pruebas1Component;
  let fixture: ComponentFixture<Pruebas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pruebas1Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pruebas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebarastreoComponent } from './pruebarastreo.component';

describe('PruebarastreoComponent', () => {
  let component: PruebarastreoComponent;
  let fixture: ComponentFixture<PruebarastreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebarastreoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebarastreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

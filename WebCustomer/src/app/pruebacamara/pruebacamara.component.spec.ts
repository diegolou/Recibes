import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebacamaraComponent } from './pruebacamara.component';

describe('PruebacamaraComponent', () => {
  let component: PruebacamaraComponent;
  let fixture: ComponentFixture<PruebacamaraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebacamaraComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebacamaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

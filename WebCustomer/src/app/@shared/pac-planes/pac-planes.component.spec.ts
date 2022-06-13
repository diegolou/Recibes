import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacPlanesComponent } from './pac-planes.component';

describe('PacPlanesComponent', () => {
  let component: PacPlanesComponent;
  let fixture: ComponentFixture<PacPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacPlanesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

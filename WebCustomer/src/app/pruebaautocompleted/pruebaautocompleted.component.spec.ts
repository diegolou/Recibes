import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaautocompletedComponent } from './pruebaautocompleted.component';

describe('PruebaautocompletedComponent', () => {
  let component: PruebaautocompletedComponent;
  let fixture: ComponentFixture<PruebaautocompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaautocompletedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaautocompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

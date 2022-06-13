import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebapanelComponent } from './pruebapanel.component';

describe('PruebapanelComponent', () => {
  let component: PruebapanelComponent;
  let fixture: ComponentFixture<PruebapanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebapanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebapanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

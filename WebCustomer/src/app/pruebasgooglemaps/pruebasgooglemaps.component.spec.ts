import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasgooglemapsComponent } from './pruebasgooglemaps.component';

describe('PruebasgooglemapsComponent', () => {
  let component: PruebasgooglemapsComponent;
  let fixture: ComponentFixture<PruebasgooglemapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebasgooglemapsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasgooglemapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

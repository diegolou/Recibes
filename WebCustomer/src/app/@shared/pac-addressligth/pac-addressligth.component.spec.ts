import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacAddressligthComponent } from './pac-addressligth.component';

describe('PacAddressligthComponent', () => {
  let component: PacAddressligthComponent;
  let fixture: ComponentFixture<PacAddressligthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacAddressligthComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacAddressligthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

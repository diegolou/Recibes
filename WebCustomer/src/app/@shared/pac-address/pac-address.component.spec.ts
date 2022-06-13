import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacAddressComponent } from './pac-address.component';

describe('PacAddressComponent', () => {
  let component: PacAddressComponent;
  let fixture: ComponentFixture<PacAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PacAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

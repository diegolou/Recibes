import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistAddressComponent } from './dist-address.component';

describe('DistAddressComponent', () => {
  let component: DistAddressComponent;
  let fixture: ComponentFixture<DistAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

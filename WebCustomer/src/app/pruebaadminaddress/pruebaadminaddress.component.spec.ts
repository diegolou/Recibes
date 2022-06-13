import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaadminaddressComponent } from './pruebaadminaddress.component';

describe('PruebaadminaddressComponent', () => {
  let component: PruebaadminaddressComponent;
  let fixture: ComponentFixture<PruebaadminaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaadminaddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaadminaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

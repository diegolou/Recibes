import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocalizacionComponent } from './geolocalizacion.component';

describe('GeolocalizacionComponent', () => {
  let component: GeolocalizacionComponent;
  let fixture: ComponentFixture<GeolocalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeolocalizacionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

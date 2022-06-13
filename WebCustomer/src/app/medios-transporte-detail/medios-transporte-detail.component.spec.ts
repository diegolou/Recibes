import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediosTransporteDetailComponent } from './medios-transporte-detail.component';

describe('MediosTransporteDetailComponent', () => {
  let component: MediosTransporteDetailComponent;
  let fixture: ComponentFixture<MediosTransporteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediosTransporteDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediosTransporteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

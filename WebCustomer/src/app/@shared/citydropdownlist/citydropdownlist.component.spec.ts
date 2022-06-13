import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitydropdownlistComponent } from './citydropdownlist.component';

describe('CitydownloadComponent', () => {
  let component: CitydropdownlistComponent;
  let fixture: ComponentFixture<CitydropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CitydropdownlistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitydropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

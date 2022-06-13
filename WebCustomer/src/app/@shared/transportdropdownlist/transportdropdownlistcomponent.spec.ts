import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportdropdownlistComponent } from './transportdropdownlist.component';

describe('CitydownloadComponent', () => {
  let component: TransportdropdownlistComponent;
  let fixture: ComponentFixture<TransportdropdownlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransportdropdownlistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportdropdownlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

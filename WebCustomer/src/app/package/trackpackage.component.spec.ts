import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackpackageComponent } from './trackpackage.component';

describe('TrackpackageComponent', () => {
  let component: TrackpackageComponent;
  let fixture: ComponentFixture<TrackpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackpackageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

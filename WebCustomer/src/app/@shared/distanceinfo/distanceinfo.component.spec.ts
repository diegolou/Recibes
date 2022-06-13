import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceinfoComponent } from './distanceinfo.component';

describe('DistanceinfoComponent', () => {
  let component: DistanceinfoComponent;
  let fixture: ComponentFixture<DistanceinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistanceinfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanceinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

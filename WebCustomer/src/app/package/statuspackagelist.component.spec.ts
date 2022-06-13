import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuspackagelistComponent } from './statuspackagelist.component';

describe('StatuspackagelistComponent', () => {
  let component: StatuspackagelistComponent;
  let fixture: ComponentFixture<StatuspackagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatuspackagelistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatuspackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

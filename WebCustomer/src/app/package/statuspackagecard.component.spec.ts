import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuspackagecardComponent } from './statuspackagecard.component';

describe('StatuspackagecardComponent', () => {
  let component: StatuspackagecardComponent;
  let fixture: ComponentFixture<StatuspackagecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatuspackagecardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatuspackagecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

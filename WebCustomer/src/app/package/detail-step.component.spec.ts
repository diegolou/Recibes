import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStepComponent } from './detail-step.component';

describe('DetailStepComponent', () => {
  let component: DetailStepComponent;
  let fixture: ComponentFixture<DetailStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailStepComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

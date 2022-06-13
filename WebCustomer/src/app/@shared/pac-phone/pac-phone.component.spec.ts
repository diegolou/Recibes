import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacPhoneComponent } from './pac-phone.component';

describe('PacPhoneComponent', () => {
  let component: PacPhoneComponent;
  let fixture: ComponentFixture<PacPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacPhoneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

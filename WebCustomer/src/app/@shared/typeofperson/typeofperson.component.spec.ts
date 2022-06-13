import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofpersonComponent } from './typeofperson.component';

describe('TypeofpersonComponent', () => {
  let component: TypeofpersonComponent;
  let fixture: ComponentFixture<TypeofpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeofpersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

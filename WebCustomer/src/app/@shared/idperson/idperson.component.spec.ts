import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpersonComponent } from './idperson.component';

describe('IdpersonComponent', () => {
  let component: IdpersonComponent;
  let fixture: ComponentFixture<IdpersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdpersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

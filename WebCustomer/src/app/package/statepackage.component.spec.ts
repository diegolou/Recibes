import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatepackageComponent } from './statepackage.component';

describe('StatepackageComponent', () => {
  let component: StatepackageComponent;
  let fixture: ComponentFixture<StatepackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatepackageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatepackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

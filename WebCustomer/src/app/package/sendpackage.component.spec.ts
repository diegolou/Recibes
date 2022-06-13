import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpackageComponent } from './sendpackage.component';

describe('SendpackageComponent', () => {
  let component: SendpackageComponent;
  let fixture: ComponentFixture<SendpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendpackageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

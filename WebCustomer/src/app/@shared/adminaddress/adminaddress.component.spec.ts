import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddressComponent } from './adminaddress.component';

describe('AdminaddressComponent', () => {
  let component: AdminaddressComponent;
  let fixture: ComponentFixture<AdminaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminaddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostdetailComponent } from './costdetail.component';

describe('CostdetailComponent', () => {
  let component: CostdetailComponent;
  let fixture: ComponentFixture<CostdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostdetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

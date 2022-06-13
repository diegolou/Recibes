import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPackerComponent } from './detail-packer.component';

describe('DetailPackerComponent', () => {
  let component: DetailPackerComponent;
  let fixture: ComponentFixture<DetailPackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPackerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StatepackageGuard } from './statepackage.guard';

describe('StatepackageGuard', () => {
  let guard: StatepackageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StatepackageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

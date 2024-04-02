import { TestBed } from '@angular/core/testing';

import { RoleLoadGuard } from './role-load.guard';

describe('RoleLoadGuard', () => {
  let guard: RoleLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

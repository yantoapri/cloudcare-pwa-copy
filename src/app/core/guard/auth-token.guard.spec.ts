import { TestBed } from '@angular/core/testing';

import { AuthTokenGuard } from './auth-token.guard';

describe('AuthTokenGuard', () => {
  let guard: AuthTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

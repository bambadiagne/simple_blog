import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mustBeYourPostGuard } from './must-be-your-post.guard';

describe('mustBeYourPostGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => mustBeYourPostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

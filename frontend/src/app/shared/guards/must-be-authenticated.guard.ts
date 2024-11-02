import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from 'src/app/users/service/users.service';

export const mustBeAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);
  return userService.isAuthenticated() ? true : router.parseUrl('/auth/login');
};

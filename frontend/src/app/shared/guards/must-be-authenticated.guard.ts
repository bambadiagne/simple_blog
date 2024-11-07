import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { UsersService } from 'src/app/users/service/users.service';

export const mustBeAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);
  return userService.getCurrentUser().pipe(
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/auth/login']);
      }
      return true;
    })
  );
};

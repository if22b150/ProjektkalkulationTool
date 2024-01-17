import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {ERole} from "../models/user.model";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user?.role != ERole.ADMIN || !authService.isLoggedInAndVerified) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

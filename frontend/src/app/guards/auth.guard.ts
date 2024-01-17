import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {ERole} from "../models/user.model";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedInAndVerified || !authService.user?.passwordReset)
    return true;

  router.navigate([authService.user.role == ERole.FACULTY ? 'customer' : 'admin']);
};

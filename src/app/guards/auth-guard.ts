import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

export const authGuard: CanActivateFn = (route, state) => {
  const token =localStorage.getItem('token');
  const authService = inject(AuthenticationService)
  const router = inject(Router);
  /* da sistemare l'authGuard */
  if(authService.isTheUserAuthenticated()) {
    console.log(authService.IsAuthenticated)
    return true;
  } else {
    console.log(authService.IsAuthenticated)
    router.navigate(['/login'])
    return false;
  }

  /*


 if(token != null) {
    return true;
  } else {
    router.navigate(['/login'])
    return false;
  }

  */
};

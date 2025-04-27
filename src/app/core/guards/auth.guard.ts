import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _userAuthService = inject(AuthServiceService);
  let router = inject(Router);

  if(_userAuthService.getAuthStatus().getValue()){
    return true;
  }else{
    router.navigateByUrl('/login')
    return false;
  }
};

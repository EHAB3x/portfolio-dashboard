import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const token = authService.getToken();

  if (req.url.startsWith('https://api.github.com') || req.url.startsWith('https://api.imgbb.com/1/upload')) {
    return next(req);
  }

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};

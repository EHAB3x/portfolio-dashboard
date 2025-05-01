import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'; // adjust path if needed

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const token = authService.getToken();

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

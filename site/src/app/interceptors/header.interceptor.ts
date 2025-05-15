import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeaders = req.clone({
    headers: req.headers
      .set('Access-Control-Allow-Origin', '*')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
  })
  return next(reqWithHeaders);
};

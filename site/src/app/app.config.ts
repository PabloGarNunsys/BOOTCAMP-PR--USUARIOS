import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './interceptors/header.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor])
    ),
    provideToastr(),
    provideAnimations()
  ]
};

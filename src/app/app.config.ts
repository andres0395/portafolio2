import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    NgxImageCompressService
  ]
};

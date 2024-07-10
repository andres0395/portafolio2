import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { NgxImageCompressService } from 'ngx-image-compress';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withViewTransitions()),
    {provide:LocationStrategy,useClass:PathLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/' },
    NgxImageCompressService
  ]
};

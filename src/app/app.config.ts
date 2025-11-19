import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEn from '@angular/common/locales/en';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
registerLocaleData(localeEn);

export function provideLocaleConfig(): Provider[] {
  return [
    {
      provide: LOCALE_ID,
      useValue: 'en-EN',
    },
    {
      provide: DateAdapter,
      useClass: NativeDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLocaleConfig(),
    DatePipe,
  ]
};

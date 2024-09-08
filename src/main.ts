import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorFn } from './app/dashboard/loader/interceptor.service';

// Use functional interceptor with withInterceptors
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([interceptorFn]) // Register functional interceptor
    )
  ]
}).catch((err) => console.error(err));

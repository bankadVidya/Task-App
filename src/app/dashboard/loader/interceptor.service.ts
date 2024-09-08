import { HttpEvent, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingBarService } from './loading-bar.service';

//before angular 17 version interceptor service was used but now interceptorFn needs to be used
export const interceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingBarService); // Inject the service
  loadingService.loadingSubject.next(true);
  console.log('show loader');

  return next(req).pipe(
    finalize(() => {
      console.log('hide loader');
      loadingService.loadingSubject.next(false);
    })
  );
};

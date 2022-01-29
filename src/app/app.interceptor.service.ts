import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const regExp = new RegExp(/assets/g, 'i');
    const newReq = req.clone({
      url: regExp.test(req.url)
        ? req.url
        : `${environment.serviceUrl}${req.url}`,
    });

    return next.handle(newReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          return observableThrowError(
            new Error('Internal server error occurred!')
          );
        }
      )
    );
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { convertHttpError } from '../../lib/operators.rxjs';

/**
 * Intercepts any http error and convert them to DataServiceError.
 * Error stays on "error" channel.
 */
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        convertHttpError()
      );
  }

}

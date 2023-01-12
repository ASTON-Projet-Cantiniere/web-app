import {Inject, Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "@core/services/auth.service";
import {Router} from "@angular/router";

/**
 * This interceptor is used to add the token to the request.
 * It also handle the error and the response.
 */
@Injectable()
class AuthInterceptor implements HttpInterceptor {

  private readonly _protocols = ['http://', 'https://'];

  constructor(
    @Inject('API_URL') private baseUrl: string,
    private authService: AuthService,
    private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('req.url--->>>', req.url);
    // Check if the request not contain protocol (only relative path is provided for API calls)
    if (this._protocols.every(p => !req.url.startsWith(p))) {
      req = req.url.startsWith('/')
        ? req.clone({url: this.baseUrl + req.url})
        : req.clone({url: this.baseUrl + '/' + req.url});
    }
    if (this.authService.isAuthentified()) {
      // Clone the request to add the new header.
      const newReq = req.headers.has('Authorization')
        ? req : req.clone({
          headers: req.headers.set('Authorization', this.authService.getToken() ?? '')
        });
      // Pass on the cloned request instead of the original request.
      return next.handle(newReq).pipe(
        catchError((err) => this.handleError(newReq, next, err)),
      );
    }
    return next.handle(req);
  }

  handleError(req: HttpRequest<any>, next: HttpHandler, error: any) {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.authService.signOut();
      this.router.navigate(['account/signin']);
      return next.handle(req);
    }
    return throwError(error);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}


/*return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            switch (error.status) {
              case 401: // Unautorized
                this.toastr.error(`${error.statusText}`, 'Authorization Error');
                break;
              case 403: // Forbidden
                this.toastr.error(`${error.statusText}`, 'Access Error');
                break;
              case 404: // Not found
                this.toastr.error(`${error.statusText}`, 'Route Error');
                break;
              case 503: // Server error
                this.toastr.error(`${error.statusText}`, 'Server Error');
                break;
            }
          }
        } else {
          console.log('An error occurred');
        }
        return throwError(() => new Error(error.statusText));
      })*/

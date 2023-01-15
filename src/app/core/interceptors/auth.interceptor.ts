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
import {AuthService} from "@shared/services/auth.service";
import {ToastrService} from "ngx-toastr";

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
    private toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request not contain protocol (only relative path is provided for API calls)
    if (this._protocols.every(p => !req.url.startsWith(p))) {
      req = req.url.startsWith('/')
        ? req.clone({url: this.baseUrl + req.url})
        : req.clone({url: this.baseUrl + '/' + req.url});
    }
    if (this.authService.isAuthentified()) {
      // Clone the request to add the new header if current request do not have Authorization set
      req = req.headers.has('Authorization')
        ? req : req.clone({
          headers: req.headers.set('Authorization', this.authService.getToken() ?? '')
        });
    }
    return next.handle(req).pipe(
      catchError((err) => this.handleError(req, next, err)),
    );
  }

  private handleError(req: HttpRequest<any>, next: HttpHandler, error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.log('Error Event');
      } else {
        switch (error.status) {
          case 401: // Unautorized
            if (!req.url.endsWith('/login')) {
              this.authService.signOut();
              this.toastr.error('Vous n\'êtes pas autorisé à accéder à cette page');
            } else {
              this.toastr.error('Identifiant ou mot de passe incorrect');
            }
            break;
          case 400: // Bad request
            this.toastr.error('Le formulaire n\'est pas valide');
            break;
          case 403: // Forbidden
            this.toastr.error('Erreur. Vous n\'avez pas les droits pour accéder à cette ressource');
            break;
          case 404: // Not found
            this.toastr.error('Erreur. La ressource demandée n\'existe pas');
            break;
          case 408: // Timeout handling
            this.toastr.error('Erreur. Le serveur ne répond pas');
            break;
          case 412: // Precondition failed
            if (req.url.endsWith('/register')) {
              this.toastr.error('Erreur. Un utilisateur avec cet email existe déjà');
            } else {
            }
            break;
          case 500: // Internal server error
            this.toastr.error('Erreur. Une erreur est survenue sur le serveur');
            break;
          case 503: // Server error
            this.toastr.error('Erreur. Le serveur est indisponible');
            break;
          default: // Other errors
            break;
        }
      }
    } else {
      console.log('An error occurred');
    }
    return throwError(() => new Error(error));
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

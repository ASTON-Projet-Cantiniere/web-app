import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /*
     * To simplify usage of token in the request, we can use the following code:
     *  request = request.clone({ setHeaders:
     *     {Authorization: `Bearer ${token}`}
     * });
     *
    */
    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token = localStorage.getItem("token");

        if (token) {
            request = request.clone({ setHeaders: {Authorization: `${token}`}});
        }

        return next.handle(request);
    }
}

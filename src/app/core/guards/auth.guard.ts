import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "@shared/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(childRoute);
  }

  /**
   * Check if the user is authentified. If not, it allows to navigate to the signin signu page.
   * @param childRoute
   * @private
   */
  private check(childRoute: ActivatedRouteSnapshot): boolean {
    // If the user is authentified we allow to navigate except to the signin and signup page.
    if (this.authService.isAuthentified()) {
      return childRoute.routeConfig?.path !== 'signin' && childRoute.routeConfig?.path !== 'signup';
    }
    // If the user is not authentified and the route is signin or signup,
    // the user is allowed to access the route.
    else if (childRoute.routeConfig?.path === 'signin' || childRoute.routeConfig?.path === 'signup') {
      return true;
    }
    return false;
  }
}

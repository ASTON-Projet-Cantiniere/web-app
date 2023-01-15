import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import Credential from "@shared/models/credentials.model";
import {RegisterCredentials} from "@shared/models/register-credentials.model";
import {Observable, Subject, Subscription, takeUntil, tap} from 'rxjs';
import {TokenService} from "@core/services/token.service";
import {BroadcasterService} from "@core/services/broadcaster.service";
import {CONSTANTS} from "@core/constants";
import {User} from "@shared/models/user.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class AuthService implements OnDestroy {
  private $destroy = new Subject();
  private $userState = this.broadcaster.on<User>(CONSTANTS.USER_STATE).pipe(takeUntil(this.$destroy));
  private user: User | undefined;

  constructor(private http: HttpClient,
              private broadcaster: BroadcasterService,
              private router: Router,
              private toastr: ToastrService) {
    this.$userState.subscribe((user: User) => this.user = user);
    this.initUserState();
  }

  ngOnDestroy(): void {
    this.$destroy.complete(); // complete the subject to avoid memory leaks
                              // (but not mandatory here because the service is singleton)
  }

  /**
   * This method is used to register a new user
   * @param registerCredential
   * @return {Observable<HttpResponse<Object>>}
   */
  public signUp(registerCredential: RegisterCredentials): Subscription {
    return this.http.post<HttpResponse<RegisterCredentials>>('/user/register', registerCredential).pipe(
      tap((res: HttpResponse<RegisterCredentials>) => {
        // Redirect the user to the login page
        this.router.navigate(['/account/login']);
        // Display a success message
        this.toastr.success('Inscription réussie');
      })
    ).subscribe();
  }

  /**
   * This method is used to sign in
   * @param loginCredential
   * @return {Observable<HttpResponse<Object>>}
   */
  public signIn(loginCredential: Credential): Subscription {
    // call the API with the get method after executed get bearer token from header of response
    return this.http.post<HttpResponse<any>>("/login", JSON.stringify(loginCredential),
      {observe: 'response'}).pipe(
      // Note : {observe: 'response'} is required to get the header of response
      //  if you don't use it, you will get the body of response
      tap((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization');
        if (token) {
          // We store the token in the local storage for the next launch of the app
          TokenService.setToken(token);
          // We emit the user state
          this.emitUserState(token);
          // We redirect the user to the home page
          this.router.navigate(['/']);
          // We display a success message
          this.toastr.success('Vous-êtes connecté');
        }
      }),
    ).subscribe();
  }

  /**
   * This method is used to get the user
   * @return {User | undefined}
   */
  public getUser(): User | undefined {
    return this.user;
  }

  /**
   * This method is used to determine if the user is connected
   * @return {boolean}
   */
  public isAuthentified(): boolean {
    return !!this.user;
  }

  /**
   * This method is used to determine if the user is admin
   * @return {boolean}
   */
  public isAdmin(): boolean {
    return this.user?.isLunchLady ?? false;
  }

  /**
   * This method is used to get the token of the user
   * @return {string | null}
   */
  public getToken(): string | null {
    return this.user?.token ?? null;
  }

  /**
   * This method is used to sign out
   */
  public signOut() {
    TokenService.clearToken();
    this.clearUserState();
    this.router.navigate(['/']);
    this.toastr.info('Vous-êtes déconnecté');
  }

  /**
   * This method is used to listen the user state
   * @return {Observable<User>}
   */
  public listenUserState(): Observable<User> {
    return this.$userState;
  }

  /**
   * This method is used to emit the user state with the token.
   * If the token is not provided, we juste emit the user by user attribute of the service
   * @param token
   */
  public emitUserState(token?: string | null) {
    if (token) {
      const refreshUser: User = TokenService.decodeToken(token).user;
      refreshUser.token = token;
      this.broadcaster.broadcast(CONSTANTS.USER_STATE, refreshUser);
    }
    this.broadcaster.broadcast(CONSTANTS.USER_STATE, this.user);
  }

  /**
   * Method to check if the token is not expired
   * @param token
   * @return {string | null}
   */
  public tokenIsExpired(token: string): boolean | null {
    const decodedToken = TokenService.decodeToken(token);
    if (decodedToken?.exp) {
      return null;
    }
    return decodedToken.exp! < Date.now() / 1000; // convert to seconds
  }

  /**
   * This method is used to update the user state with the new user
   * @param user
   */
  public updateUserInfo(user: User) {
    this.user = user;
    this.emitUserState();
  }

  public gotoSignIn() {
    this.router.navigate(['account/login']);
  }

  public gotoSignUp() {
    this.router.navigate(['account/signup']);
  }

  /**
   * This method is used to init the user state at the launch of the service
   * @private
   */
  private initUserState() {
    const token = TokenService.getToken();
    if (token) {
      if (this.tokenIsExpired(token)) {
        this.toastr.warning('Votre session a expiré');
        this.signOut();
      } else {
        this.emitUserState(token);
      }
    }
  }

  /**
   * This method is used to clear the user state
   * @private
   */
  private clearUserState() {
    this.broadcaster.broadcast(CONSTANTS.USER_STATE, undefined);
  }
}

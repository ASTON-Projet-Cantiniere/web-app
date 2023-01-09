import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {DecodedToken} from "../models/decoded-token";

@Injectable({providedIn: 'root'})
/**
 * This service is used to manage the token.
 */
export class TokenService {
  /**
   * Get the token from the local storage.
   * @return {string | null} the token or null if there is no token.
   */
  public static getToken(): string | null {
    return localStorage.getItem('Auth-Token');
  }

  /**
   * Set the token in the local storage.
   * @param token the token to set.
   */
  public static setToken(token: string): void {
    localStorage.setItem('Auth-Token', token)
  }

  /**
   * Clear the token from the local storage.
   * @return {void}
   */
  public static clearToken(): void {
    localStorage.removeItem('Auth-Token');
  }

  /**
   * Decode the token passed in parameter.
   * @return {DecodedToken | null}
   * @throws {Error} if the token is not valid.
   */
  public static decodeToken(token: string): DecodedToken {
    return jwt_decode<DecodedToken>(token);
  }
}

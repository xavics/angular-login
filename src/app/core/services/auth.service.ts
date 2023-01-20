/**
 * Created by xavi on 5/16/17.
 */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap, tap } from "rxjs";
import { LoginObject } from "src/app/core/models/login-object.model";
import { Session } from "../models/session.model";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly basePath = '/api/authenticate/';
  private isAuthenticated: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  set token(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get token(): string {
    return localStorage.getItem(this.TOKEN_KEY) ?? '';
  }

  login(loginObj: LoginObject): Observable<Session> {
    return this.httpClient.post<Session>(this.basePath + 'login', loginObj).pipe(
      tap(
        (session) => {
          // Set as authenticated
          this.isAuthenticated = true;
          // Set token and user
          this.userService.user = session.user;
          this.token = session.token
        }
      )
    );
  }

  logout(): Observable<Boolean> {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated = false;
    return of(true);
  }

  validateToken(): Observable<any> {
    const _token = JSON.parse(atob(this.token));
    if (_token.exp > Math.floor(Date.now() / 1000)) {
      this.isAuthenticated = true;
      return this.userService.get(_token.user).pipe(
        switchMap(() => {
          return of(true)
        }),
        catchError(() => {
          return of(false);
        })
      )
    } else {
      return of(false);
    }

  }

  validate(): Observable<boolean> {

    if (this.isAuthenticated) {
      return of(true);
    }

    if (!this.token) {
      return of(false)
    }

    return this.validateToken();
  }

}

/**
 * Created by xavi on 5/16/17.
 */
import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import * as jwt from 'jwt-simple';

@Injectable()
export class StorageService {

  private localStorageService;
  private currentToken : string = null;
  // private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentToken = this.loadToken();
  }

  setCurrentToken(token: string): void {
    this.currentToken = token;
    this.localStorageService.setItem('token', token);
  }

  loadToken(): string{
    return this.localStorageService.getItem('token');
  }

  getCurrentToken(): string {
    return this.currentToken;
  }

  removeCurrentToken(): void {
    this.localStorageService.removeItem('token');
    this.currentToken = null;
  }

  // getCurrentUser(): User {
    // var session: Session = this.getCurrentSession();
    // return (session && session.user) ? session.user : null;
  // };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  removeStorage(): void{
    this.removeCurrentToken();
    this.router.navigate(['/login']);
  }

}

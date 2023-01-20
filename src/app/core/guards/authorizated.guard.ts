/**
 * Created by xavi on 2/17/17.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate() {
    return this.authService.validate().pipe(
      switchMap(
        valid => {
          if (!valid) {
            this.router.navigate(['/login']);
            return of(false);
          }
          return of(true);
        }
      )
    )
  }
}

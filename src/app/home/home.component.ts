/**
 * Created by xavi on 5/16/17.
 */
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/services/auth.service";
import { User } from "../core/models/user.model";
import { UserService } from "../core/services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);
  }

  public logout(): void {
    this.authService.logout().subscribe(
      () => { this.router.navigate(['login']) }
    );
  }

}

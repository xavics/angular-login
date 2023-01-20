/**
 * Created by xavi on 5/16/17.
 */
import {Component, OnInit} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import { LoginObject } from "../core/models/login-object.model";
import {Session} from "../core/models/session.model";
import { AuthService } from "../core/services/auth.service";
@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public error: {code: number, message: string} | null = null;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('username');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.authService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error;
        }
      )
    }
  }

  private correctLogin(data: Session){
    this.router.navigate(['/home']);
  }
}

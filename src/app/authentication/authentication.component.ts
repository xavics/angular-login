/**
 * Created by xavi on 5/16/17.
 */
import {Component} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {LoginObject} from "./shared/login-object.model";
import {AuthenticationService} from "./shared/authentication.service";
import {StorageService} from "../core/services/storage.service";
@Component({
  selector: 'authentication',
  templateUrl: 'authentication.component.html'
})

export class AuthenticationComponent {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService) { }

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
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.storageService.setCurrentSession(data),
        error => this.error = JSON.parse(error._body)
      )
    }
  }
}

/**
 * Created by xavi on 5/16/17.
 */
import {Component} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
@Component({
  selector: 'authentication',
  templateUrl: 'authentication.component.html'
})

export class AuthenticationComponent {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public submitLogin(): void {
    console.info("Form: ", this.loginForm.value)
  }
}

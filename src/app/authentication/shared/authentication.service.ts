import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
/**
 * Created by xavi on 5/16/17.
 */
@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {}

  private basePath = '/api/authenticate/';

  login(loginObj: LoginObject): Observable<{token: string}> {
    return this.http.post(this.basePath + 'login', loginObj).map(this.extractData);
  }

  logOut(): Observable<Boolean> {
    return this.http.post(this.basePath + 'logout', {}).map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
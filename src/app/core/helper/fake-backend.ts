/**
 * Created by xavi on 2/17/17.
 */
import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, ResponseType} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {User} from "../models/user.model";
import {USERS} from "../mocks/mock-users";

class MockError extends Response implements Error {
  name:any;
  message:any;
}

export function fakeBackendFactory (backend: MockBackend, options: BaseRequestOptions) {
  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {
      // fake authenticate api end point
      if (connection.request.url.endsWith('/api/authenticate/login') && connection.request.method === RequestMethod.Post) {
        let params = JSON.parse(connection.request.getBody());

        // check user credentials and return fake jwt token if valid
        let found: User = USERS.find((user: User) => {return (params.username === user.username);});
        if (found) {
          if(params.password === found.password) {
            connection.mockRespond(new Response(
              new ResponseOptions({status: 200, body: {token: 'fake-token-jwt', user: found}})
            ));
          }else{
            connection.mockError(new MockError(new ResponseOptions({type:ResponseType.Error, status:400, body: JSON.stringify({code: 2, message: 'The password does not match '})})));
          }
        } else {
          connection.mockError(new MockError(new ResponseOptions({type:ResponseType.Error, status:400, body: JSON.stringify({code: 1, message: 'Username does not exists'})})));
        }

      }

      if (connection.request.url.endsWith('/api/authenticate/logout') && connection.request.method === RequestMethod.Post) {
        let params = JSON.parse(connection.request.getBody());
        connection.mockRespond(new Response(
          new ResponseOptions({status: 200, body: true})
        ));
      }
    }, 100);

  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};

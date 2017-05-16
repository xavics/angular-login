/**
 * Created by xavi on 2/17/17.
 */
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {User} from "../models/user.model";
import {USERS} from "./mock-users";

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
        // fake authenticate api end point
        if (connection.request.url.endsWith('/api/authenticate/login') && connection.request.method === RequestMethod.Post) {
          // get parameters from post request
          let params = JSON.parse(connection.request.getBody());

          // check user credentials and return fake jwt token if valid
          let found: User = USERS.find((user: User) => {return (params.username === user.username && params.password === user.password);});
            if (found) {
              connection.mockRespond(new Response(
                new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
              ));
            } else {
              connection.mockError(new Error('Incorrect credentials.'));
            }

        }
      }, 500);

    });

    return new Http(backend, options);
  },
  deps: [MockBackend, BaseRequestOptions]
};

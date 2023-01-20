import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, tap } from "rxjs";
import { User } from "../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly basePath = '/api/user/';
    private _user: ReplaySubject<User> = new ReplaySubject<User>();

    constructor(
        private httpClient: HttpClient
    ) {}

    set user(value: User) {
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get(id: string): Observable<User> {
        return this.httpClient.get<User>(`${this.basePath}/${id}`).pipe(
            tap((user) => this.user = user)
        )
    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from 'libs/src/shared/models/user-credentials.model';
import { User } from 'libs/src/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(private http: HttpClient) {
    }

    signup(userData: User): Observable<User> {
        return this.http.post<User>('/api/auth/signup', userData);
    }

    signin(userCredentials: UserCredentials): Observable<{ accessToken: string; }> {
        return this.http.post<{ accessToken: string; }>('/api/auth/signin', userCredentials);
    }
}
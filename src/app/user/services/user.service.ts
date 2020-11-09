import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app-env/environment';
import { Gender } from '@app-types/gender.enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user.model';

export interface UserResponseData {
    id: string;
    firstName: string;
    lastName?: string;
    dateOfBirth: Date;
    email: string;
    gender: Gender;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userSubject = new BehaviorSubject<User>(null);
    public user$ = this.userSubject.asObservable();

    constructor(private readonly http: HttpClient) { }

    public create(userData: UserResponseData): Observable<UserResponseData> {
        return this.http.put<UserResponseData>(environment.firebase.databaseUrl + 'users/' + userData.id + '.json', {
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth,
            email: userData.email,
            gender: userData.gender
        }).pipe(tap(response => {
            const user = new User(
                response.id,
                response.firstName,
                response.lastName,
                new Date(response.dateOfBirth),
                response.gender,
                response.email
            );
            this.userSubject.next(user);
        }));
    }

    public getUser(id: string): Observable<any> {
        return this.http.get(environment.firebase.databaseUrl + 'users/' + id + '.json')
            .pipe(tap(response => console.log(response)));
    }
}

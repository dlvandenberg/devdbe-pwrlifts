import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app-env/environment';
import { Gender } from '@app-types/gender.enum';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

export interface UserData {
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

    constructor(private readonly http: HttpClient) { }

    public create(userData: UserData): void {
        console.log('create user with id: ' + userData.id);
        this.http.put(environment.firebase.databaseUrl + 'users/' + userData.id + '.json', {
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth,
            email: userData.email,
            gender: userData.gender.toString()
        }).subscribe(response => console.log(response));
    }

    // public getUser(id: string): Observable<User> {
    //     this.http.get(environment.)
    // }
}

import { Gender } from '@app-types/gender.enum';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: Gender;
    email: string;
}

export class User implements IUser{
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public gender: Gender,
        public email: string
    ) { }
}

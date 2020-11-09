import { Gender } from '@app-types/gender.enum';

export class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public gender: Gender,
        public email: string
    ) { }
}

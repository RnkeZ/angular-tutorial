import { Gender } from './gender';

export class Person {
    personid: number;
    firstname: string;
    middlename?: string;
    lastname: string;
    dateofbirth: number;
    genderid: number;
    gender: Gender;
}

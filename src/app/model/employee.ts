import { Person } from './person';
import { WorkingPosition } from './working-position';
import { Department } from './department';

export class Employee {
    employeeid: number;
    personid: number;
    epid: string;
    departmentworkingpositionid: number;
    dateofemployment: number;
    title: string;
    email: string;
    telephonenumber: string;
    active: boolean;
    digitalsignature?: any;
    person: Person;
    workingPosition: WorkingPosition;
    department: Department;
    isManager: boolean;
}


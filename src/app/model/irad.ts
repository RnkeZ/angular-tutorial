import { TypeOfAbsence } from './type-of-absence';
import { WorkingTime } from './working-time';
import { Employee } from './employee';

export class IRad {
  iradid: number;
  employeeid: number;
  documentid: number;
  absencedatestart: any;
  absencedateend: any;
  reason: string;
  departmentmanagerid: number;
  dateofcreation: number;
  signatureemplyoee: string;
  signaturemanager: string;
  validated: boolean;
  typeOfAbsences: TypeOfAbsence[];
  workingTimes: WorkingTime[];
  manager: Employee;
}


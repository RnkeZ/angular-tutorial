import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Employee } from '../model/employee';

@Injectable()
export class CommunicationService {
  static employeeRaw: Employee;
  static managerRaw: Employee;
  private employee = new Subject<Employee>();
  private manager = new Subject<Employee>();
  private refresh = new Subject<boolean>();
  private error = new Subject<string>();

  // Observable streams
  employee$ = this.employee.asObservable();
  manager$ = this.manager.asObservable();
  refresh$ = this.refresh.asObservable();
  error$ = this.error.asObservable();

  // Service message commands
  publishDataEmployee(state: Employee) {
    CommunicationService.employeeRaw = state;
    this.employee.next(state);
  }

  publishDataManager(state: Employee) {
    CommunicationService.managerRaw = state;
    this.employee.next(state);
  }

  publishDataRefresh(state: boolean) {
    this.refresh.next(state);
  }

  publishDataError(data: string) {
    this.error.next(data);
  }
}

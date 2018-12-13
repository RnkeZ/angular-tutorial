import { Injectable } from '@angular/core';
import { Response, RequestOptions, ResponseContentType, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http/http.service';
import { SockJS } from 'sockjs-client';
import { Stomp } from 'stompjs';
import { IRad } from '../model/irad';

@Injectable()
export class DataService {
  url = '';
  constructor(private http: HttpService) {

  }

  public getEmployeeByEmail(email: string): Observable<any> {
    this.url = 'emplyoees?email=' + email;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }

  public getManagerByDepartmentCode(departmentCode: string, isManager: boolean): Observable<any> {
    this.url = 'emplyoees?departmentCode=' + departmentCode + '&isManager=' + isManager;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }

  public getIRadsByEmployeeId(employeeId: any): Observable<any> {
    this.url = 'documents/irads?employeeId=' + employeeId;
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }

  public postIRad(object: IRad): Observable<any> {
    this.url = 'documents/irads/';
    const result = this.http
      .post(this.url, object)
      .map((response: Response) => <any>response);
    return result;
  }

  public putIRad(object: IRad): Observable<any> {
    this.url = 'documents/irads/';
    const result = this.http
      .put(this.url + object.iradid, object)
      .map((response: Response) => <any>response);
    return result;
  }

  public deleteIRad(iradid: number): Observable<any> {
    this.url = 'documents/irads/' + iradid;
    const result = this.http
      .delete(this.url)
      .map((response: Response) => <any>response);
    return result;
  }

  public getTypesOfAbsence(): Observable<any> {
    this.url = 'absences/types';
    const result = this.http
      .get(this.url)
      .map((response: Response) => <any>response.json());
    return result;
  }


}

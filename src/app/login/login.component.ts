import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService, HttpService]
})
export class LoginComponent implements OnInit {
  emailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private communicationService: CommunicationService,
    private dataService: DataService) {

  }

  ngOnInit(): void {
    this.emailFormGroup = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.emailFormGroup.valid && this.passwordFormGroup.valid) {
      this.dataService
        .getEmployeeByEmail(this.emailFormGroup.controls.email.value)
        .subscribe(
          (response) => {
            this.communicationService.publishDataEmployee(response.data[0]);
          },
          error => console.log(<any>error),
          (() => {
            this.dataService
              .getManagerByDepartmentCode(CommunicationService.employeeRaw.department.code, true)
              .subscribe(
                (response) => {
                  this.communicationService.publishDataManager(response.data[0]);
                },
                error => console.log(<any>error),
                (() => {

                  this.router.navigate(['/home'], { skipLocationChange: true });
                }));
          }));
    } else {
      this.communicationService.publishDataError('Greška kod dohvata korisničkih podataka!');
    }
  }

}

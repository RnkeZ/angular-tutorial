import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { TypeOfAbsence } from '../../model/type-of-absence';
import { IRad } from '../../model/irad';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../http/http.service';
import { WorkingTime } from '../../model/working-time';
import { convertMillisToTime } from '../../shared/functions/convertTimeInMilisecondsToHumanString';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-unos-i-rad',
  templateUrl: './unos-i-rad.component.html',
  styleUrls: ['./unos-i-rad.component.css'],
  providers: [DataService, HttpService]
})
export class UnosIRadComponent implements OnInit {
  iRadForm: FormGroup;
  title = 'Unos I-Rad-a';
  row: IRad = new IRad();
  workingTimes: any;
  put = false;
  disabled = false;
  checkedTypeOfAbsence: TypeOfAbsence[] = [];

  constructor(private communicationService: CommunicationService, private formBuilder: FormBuilder,
    private dataService: DataService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.iRadForm = this.formBuilder.group({
      absencedatestart: [{ value: new Date(this.row.absencedatestart), disabled: this.disabled }, [<any>Validators.required]],
      absencedateend: [{ value: new Date(this.row.absencedateend), disabled: this.disabled }, [<any>Validators.required]],
      reason: [{ value: this.row.reason, disabled: this.disabled }, [<any>Validators.required]],
      dateofcreation: [{ value: new Date(this.row.dateofcreation), disabled: this.disabled }, [<any>Validators.required]],
      workingTimes: new FormArray([])
    });
    if (this.row && this.row.workingTimes) {
      this.row.workingTimes.forEach(element => {
        this.addItem(element);
      });
    } else {
      this.addItem();
    }
    // Debug
    this.iRadForm.valueChanges.subscribe(() => {
      console.log(this.iRadForm.value);
    });
  }

  get workingTimesData() { return <FormArray>this.iRadForm.get('workingTimes'); }

  addItem(item?: WorkingTime): void {
    (this.iRadForm.get('workingTimes') as FormArray).push(this.createFormItem(item));
  }

  removeItem(index?: number): void {
    (this.iRadForm.get('workingTimes') as FormArray).removeAt(index);
  }

  createFormItem(item?: WorkingTime): FormGroup {
    let createdItem;
    if (item) {
      createdItem = this.formBuilder.group({
        date: [{ value: new Date(item.date), disabled: this.disabled }, [<any>Validators.required]],
        starttime: [{ value: convertMillisToTime(item.starttime), disabled: this.disabled }, [<any>Validators.required]],
        endtime: [{ value: convertMillisToTime(item.endtime), disabled: this.disabled }, [<any>Validators.required]],
      });
    } else {
      createdItem = this.formBuilder.group({
        date: ['', [<any>Validators.required]],
        starttime: ['', [<any>Validators.required]],
        endtime: ['', [<any>Validators.required]],
      });
    }
    return createdItem;
  }

  setCheckedValues(object: TypeOfAbsence[]) {
    this.checkedTypeOfAbsence = object;
  }

  save(model: IRad, isValid: boolean) {
    if (isValid && this.iRadForm.valid) {
      this.row = this.iRadForm.getRawValue();
      this.row.typeOfAbsences = this.checkedTypeOfAbsence;
      this.row.employeeid = CommunicationService.employeeRaw.employeeid;
      this.row.manager = CommunicationService.managerRaw;
      this.row = this.formatDates(this.row);
      console.log('Save...: ', this.row);
      if (!this.put) {
        this.dataService.postIRad(this.row).subscribe(
          (response) => {

          },
          error => console.log(<any>error),
          (() => {
            this.communicationService.publishDataRefresh(true);
            this.matDialog.closeAll();
          }));
      } else {
        this.dataService.putIRad(this.row).subscribe(
          (response) => {

          },
          error => console.log(<any>error),
          (() => {
            this.communicationService.publishDataRefresh(true);
            this.matDialog.closeAll();
          }));
      }
    } else {
      this.communicationService.publishDataError('Niste popunili sva obavezna polja!');
    }
  }

  formatDates(object: IRad): IRad {
    object.absencedatestart = new Date(object.absencedatestart).getTime();
    object.absencedateend = new Date(object.absencedateend).getTime();
    object.dateofcreation = new Date(object.dateofcreation).getTime();
    object.workingTimes.forEach(element => {
      element.date = new Date(object.dateofcreation).getTime();
      element.starttime = this.formatTimes(element.starttime);
      element.endtime = this.formatTimes(element.endtime);
    });
    return object;
  }

  formatTimes(object: string): number {
    // tslint:disable-next-line:radix
    const hours = parseInt(object.split(':')[0]);
    // tslint:disable-next-line:radix
    const minutes = parseInt(object.split(':')[1]);
    return (hours * 60 * 1000) + (minutes * 1000);
  }
}

import { Component, OnInit, Output, Input, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DataService } from '../services/data.service';
import { HttpService } from '../http/http.service';
import { TemplatesComponent } from '../shared/ng-templates/templates.component';
import { MatDialog, DateAdapter, NativeDateAdapter } from '@angular/material';
import { UnosIRadComponent } from './unos-i-rad/unos-i-rad.component';
import { IRad } from '../model/irad';
import * as _ from 'lodash';
import { isNumeric } from 'rxjs/util/isNumeric';
import { convertMillisToTime } from '../shared/functions/convertTimeInMilisecondsToHumanString';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-i-rad',
  templateUrl: './i-rad.component.html',
  styleUrls: ['./i-rad.component.css'],
  providers: [DataService, HttpService]
})
export class IRadComponent implements OnInit, OnDestroy {
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() searchPlaceholder = 'Unesite razlog I-Rad obrasca za pretragu...';
  @Input() rows: IRad[];
  @Input() selected: IRad;
  @Input() columns: any[];
  @Input() temp = [];
  @Input() height;
  @Input() hideSearch = false;
  @Input() headerHeight = 50;
  @Input() limit: number;
  @Input() columnMode = 'standard';
  @Input() searchProp = 'reason';
  subscriptionRefresh: Subscription;
  dataLoaded = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(TemplatesComponent) templates: TemplatesComponent;

  constructor(private communicationService: CommunicationService, private dataService: DataService,
    public dialog: MatDialog) {
    this.subscriptionRefresh = this.communicationService.refresh$.subscribe(
      data => {
        console.log('refresh');
        if (data) {
          this.getData();
          this.selected = null;
        }
      });
  }

  ngOnInit() {
    this.columns = [
      { name: 'Datum kreiranja', prop: 'dateofcreation', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Datum ispravka Od', prop: 'absencedatestart', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Datum ispravka Do', prop: 'absencedateend', width: 150, cellTemplate: this.templates.templateDate },
      { name: 'Razlog', prop: 'reason', width: 150 },
      { name: 'Potvrđen', prop: 'validated', width: 150 },
      { name: 'Nadređeni', prop: 'manager.person.fullname', width: 150 },
      { name: 'Radno mjesto nadređenog', prop: 'manager.title', width: 300 },
      { name: 'Telefon nadređenog', prop: 'manager.telephonenumber', width: 150 },
      { name: 'Email nadređenog', prop: 'manager.email', width: 150 },
    ];
    this.getData();
  }

  ngOnDestroy() {
    this.subscriptionRefresh.unsubscribe();
  }

  getData() {
    console.log('getData');
    this.dataService.getIRadsByEmployeeId(CommunicationService.employeeRaw.employeeid).subscribe(
      (response) => {
        this.rows = this.formatRows(response.data);
        this.temp = [...this.rows];
      },
      error => console.log(<any>error),
      (() => {
        this.dataLoaded = true;
      })
    );
  }

  formatRows(rows: any): any {
    rows.forEach(element => {
      element.manager.person.fullname =
        element.manager.person.firstname + ' '
        + (element.manager.person.middlename != null ? element.manager.person.middlename : '') + ' ' + element.manager.person.lastname;
    });
    return rows;
  }

  updateFilter(event) {
    let val;
    let temp = [];
    val = event.target.value.toLowerCase();
    // filter our data
    if (this.searchProp != null) {
      temp = this.temp.filter(row => row[this.searchProp].toString().toLowerCase().indexOf(val) !== -1 || !val);
    }
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  onSelect(event) {
    this.selected = event.selected[0];
    console.log(this.selected);
    this.itemSelected.emit(this.selected);
  }

  createIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.getData();
      }
    });
  }

  editIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.row = this.selected;
    dialogRef.componentInstance.title = 'Izmjena I-Rad-a';
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  viewIRad() {
    const dialogRef = this.dialog.open(UnosIRadComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.row = this.selected;
    dialogRef.componentInstance.title = 'Pregled I-Rad-a';
    dialogRef.componentInstance.disabled = true;
  }

  deleteIRad() {
    if (this.selected.iradid) {
      this.dataService.deleteIRad(this.selected.iradid).subscribe(
        (response) => {

        },
        error => console.log(<any>error),
        (() => {
          this.communicationService.publishDataRefresh(true);
        }));
    }
  }

}

import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../http/http.service';
import { TypeOfAbsence } from '../../model/type-of-absence';

@Component({
  selector: 'app-tipovi-izostanka',
  templateUrl: './tipovi-izostanka.component.html',
  styleUrls: ['./tipovi-izostanka.component.css'],
  providers: [DataService, HttpService]
})
export class TipoviIzostankaComponent implements OnInit, OnChanges {
  @Output() checkedValues: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() inputTypeOfAbsences: TypeOfAbsence[];
  @Input() disabled = false;
  types: TypeOfAbsence[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTypesOfAbsence().subscribe(
      (response) => {
        this.types = response.data;
      },
      error => console.log(<any>error),
      (() => {
        this.setParentValue();
      })
    );
  }

  ngOnChanges() {
    this.setParentValue();
  }

  setParentValue() {
    if (this.types && this.inputTypeOfAbsences) {
      this.inputTypeOfAbsences.forEach(elementRecived => {
        this.types.forEach(element => {
          if (elementRecived.typeofabsenceid === element.typeofabsenceid) {
            element.checked = true;
          }
        });
      });
    }
  }

  emitValues() {
    const checkedValues: TypeOfAbsence[] = [];
    this.types.forEach(element => {
      if (element.checked) {
        checkedValues.push(element);
      }
    });
    this.checkedValues.emit(checkedValues);
  }
}

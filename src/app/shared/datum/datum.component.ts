import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { isNumeric } from 'rxjs/util/isNumeric';
import { ConfigurationService } from '../../configuration/configuration.service';

@Component({
  selector: 'app-datum',
  templateUrl: './datum.component.html',
  styleUrls: ['./datum.component.css']
})
export class DatumComponent implements OnInit, OnChanges {
  @Output() datumPicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled = false;
  @Input() placeholder;
  @Input() floatPlaceholder = 'always';
  @Input() dateFormControl: FormControl;

  constructor(private _fb: FormBuilder, dateAdapter: DateAdapter<NativeDateAdapter>) {
    dateAdapter.setLocale('hr-HR');
  }

  ngOnInit() {
    if (this.dateFormControl === undefined) {
      this.dateFormControl = new FormControl([{ value: '', disabled: this.disabled }]);
    }
  }

  ngOnChanges() {
    console.log('DateForm: ', this.dateFormControl);
  }

  onChange(event) {
    this.datumPicked.emit(event);
  }
}

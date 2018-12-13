import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './modules/materials.module';
import { TemplatesComponent } from './ng-templates/templates.component';
import { TipoviIzostankaComponent } from './tipovi-izostanka/tipovi-izostanka.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatumComponent } from './datum/datum.component';
import { ErrorComponent, ErrorDialogComponent } from './error/error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TemplatesComponent,
    TipoviIzostankaComponent,
    DatumComponent,
    ErrorComponent,
    ErrorDialogComponent
  ],
  exports: [
    MaterialsModule,
    FormsModule,
    TemplatesComponent,
    TipoviIzostankaComponent,
    ReactiveFormsModule,
    DatumComponent,
    ErrorComponent,
    ErrorDialogComponent
  ],
  entryComponents: [
    ErrorDialogComponent
  ],
})
export class SharedModule { }

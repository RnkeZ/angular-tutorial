import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IRadComponent } from './i-rad.component';
import { UnosIRadComponent } from './unos-i-rad/unos-i-rad.component';
import { SharedModule } from '../shared/shared.module';
import { CommunicationService } from '../services/communication.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [IRadComponent, UnosIRadComponent],
  exports: [IRadComponent, UnosIRadComponent],
  entryComponents: [UnosIRadComponent],
  providers: [CommunicationService]
})
export class IRadModule { }

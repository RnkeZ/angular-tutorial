import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { Subscription } from 'rxjs/Subscription';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  employee: any;
  subscription: Subscription;
  showDocs = false;
  constructor(private communicationService: CommunicationService) {
    this.employee = CommunicationService.employeeRaw;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  goToDocs() {
    this.showDocs = true;
  }

  goToApp() {
    this.showDocs = false;
  }

}

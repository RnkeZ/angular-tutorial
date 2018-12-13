import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  description: string;
  subscription: Subscription;
  constructor(private communicationService: CommunicationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.communicationService.error$
      .subscribe(
        (data) => {
          this.description = data;
          this.openDialog(this.description);
        });
  }

  openDialog(description?: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, { disableClose: true });
    dialogRef.componentInstance.description = description;
    dialogRef.afterClosed().subscribe(result => {
      description = result;
    });
  }

}
@Component({
  selector: 'app-error-dialog',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorDialogComponent {
  description: string;
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) { }
}

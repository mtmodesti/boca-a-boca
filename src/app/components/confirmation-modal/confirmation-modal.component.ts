import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-confirmation-modal',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationModalComponent>) { }

  onConfirm() {
    this.dialogRef.close(true); // retorna true se confirmou
  }

  onCancel() {
    this.dialogRef.close(false); // retorna false se cancelou
  }

}

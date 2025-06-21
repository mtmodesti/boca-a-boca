import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicesService } from '../../services/services.service';
import { GlobalDataService } from '../../services/global-data-service';


@Component({
  selector: 'app-provider-card',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, TruncatePipe],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.scss'
})
export class ProviderCardComponent {
  @Input() user: any;
  @Input() job: any;
  isEditing = false;
  editedDescription: string = '';

  constructor(private dialog: MatDialog, private service: ServicesService, private globalDataService: GlobalDataService) {

  }


  onEdit(job: any) {
    this.isEditing = true;
    this.editedDescription = job.description;
  }

  onSave(job: any) {
    this.isEditing = false;
    job.description = this.editedDescription;
    this.service.editDescription(this.editedDescription, job.id).subscribe({
      next: (res) => {
        console.log(res);
        this.globalDataService.notifyDataUpdated();
      },
      error: (err) => console.log(err),
    });
  }


  onDelete(job: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.service.removeService(job.id).subscribe({
          next: (res) => {
            console.log(res);
            this.globalDataService.notifyDataUpdated();
          },
          error: (err) => console.log(err),
        });
      }
    });
  }

}



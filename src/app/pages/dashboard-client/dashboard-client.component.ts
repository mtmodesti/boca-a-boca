import { Component } from '@angular/core';
import { ClientHeaderComponent } from '../../components/client-header/client-header.component';
import { ProfessionalsListComponent } from '../../components/professionals-list/professionals-list.component';

@Component({
  selector: 'app-dashboard-client',
  imports: [ClientHeaderComponent, ProfessionalsListComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent {

  selectValue = ''

  categoryValue(event: string) {
    this.selectValue = event
  }

}

import { Component } from '@angular/core';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import sidenavMenu from "../../assets/sidenav-menu/client-dashboard.json"
import { ClientHeaderComponent } from '../../components/client-header/client-header.component';

@Component({
  selector: 'app-dashboard-client',
  imports: [SidenavMenuComponent, ClientHeaderComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent {
  sidenaveMenuJson = sidenavMenu.menus
}

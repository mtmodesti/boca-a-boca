import { Component } from '@angular/core';
import { SidenavMenuComponent } from '../../components/sidenav-menu/sidenav-menu.component';
import sidenavMenu from "../../assets/sidenav-menu/client-dashboard.json"

@Component({
  selector: 'app-dashboard-client',
  imports: [SidenavMenuComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss'
})
export class DashboardClientComponent {
  sidenaveMenuJson = sidenavMenu.menus


}

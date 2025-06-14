import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading-component/loading-component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import sidenavMenu from "./assets/sidenav-menu/client-dashboard.json"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoadingComponent, SidenavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidenaveMenuJson = sidenavMenu.menus
  title = 'boca-a-boca';

  constructor(private router: Router) {
  }

  showSidenavMenu() {
    const forbiddenRoutes = ['/', '/signup']
    const currentUrl = this.router.url
    return !forbiddenRoutes.includes(currentUrl)
  }
}

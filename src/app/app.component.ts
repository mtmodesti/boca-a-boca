import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './components/loading-component/loading-component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import sidenavMenu from "./assets/sidenav-menu/client-dashboard.json"
import { CommonModule } from '@angular/common';
import { GlobalDataService } from './services/global-data-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoadingComponent, SidenavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private global = inject(GlobalDataService);
  user = this.global.user;
  sidenaveMenuJson = signal<any[]>([]);
  title = 'boca-a-boca';

  constructor(private router: Router, private globalDataService: GlobalDataService) {
    effect(() => {
      const currentUser = this.global.user();
      if (currentUser?.role === 'client') {
        this.sidenaveMenuJson.set(sidenavMenu.menusClient);
      } else if (currentUser?.role === 'provider') {
        this.sidenaveMenuJson.set(sidenavMenu.menusProvider);
      } else {
        this.sidenaveMenuJson.set([]);
        console.log('aaaaaaaaaaaaaaaaa')
        console.log(this.sidenaveMenuJson())
      }
    });
  }

  showSidenavMenu() {
    const forbiddenRoutes = ['/', '/signup']
    const currentUrl = this.router.url
    return !forbiddenRoutes.includes(currentUrl)
  }
}

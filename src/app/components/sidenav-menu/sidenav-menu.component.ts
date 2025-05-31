import { Component, inject, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import menuDashboard from '../../assets/sidenav-menu/client-dashboard.json'
import { Router } from '@angular/router';
import { GlobalDataService } from '../../services/global-data-service';
import { clearEncryptedLocal } from '../../utils/utils';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss'
})
export class SidenavMenuComponent {

  @Input() sidenavMenu: any[] = menuDashboard.menus
  isOpen = false;
  private global = inject(GlobalDataService);
  user = this.global.user;

  constructor(private router: Router) { }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false
  }

  clickMenu(route: string): void {
    const user = this.global.user();
    console.log('user')
    console.log(user)

    if (route === '/dashboard') {
      if (!user) {
        // Se não tiver usuário logado, redireciona para login (opcional)
        this.router.navigate(['/']);
      } else {
        const url = user.role === 'client' ? '/clientdashboard' : '/providerdashboard';
        this.router.navigate([url]);
      }
      this.closeMenu();
    }
    else if (route === '/') {
      // Logout: limpa storage e sinal global
      clearEncryptedLocal('app_user');
      this.global.clearUser();
      this.router.navigate(['/']);
      this.closeMenu();
    }
    else {
      this.router.navigate([route]);
      this.closeMenu();
    }
  }


}

import { Component, Input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import menuDashboard from '../../assets/sidenav-menu/client-dashboard.json'
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  @Input() sidenavMenu: any[] = menuDashboard.menus
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false
  }

  clickMenu(route: string): void {
    this.router.navigate([route])
  }

}

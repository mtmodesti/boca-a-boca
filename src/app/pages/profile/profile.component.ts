import { Component, inject, OnInit } from '@angular/core';
import { GlobalDataService } from '../../services/global-data-service';
import { ClientProfileComponent } from '../../components/client-profile/client-profile.component';
import { ProviderProfileComponent } from '../../components/provider-profile/provider-profile.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [ClientProfileComponent, ProviderProfileComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private global = inject(GlobalDataService);
  user = this.global.user;


  constructor(private globalDataService: GlobalDataService) {

  }


  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { ProviderCardComponent } from '../provider-card/provider-card.component';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-professionals-list',
  imports: [CommonModule, ProviderCardComponent],
  templateUrl: './professionals-list.component.html',
  styleUrl: './professionals-list.component.scss'
})
export class ProfessionalsListComponent implements OnInit {

  @Input() selectedValue: any = {}
  providers = []

  constructor(private userService: UserService, private toastr: ToastrService,
    private servicesService: ServicesService

  ) { }


  ngOnInit(): void {


  }



  getProviders() {
    this.userService.getAllProviders().subscribe((res) => {
      this.providers = res
    }, (err) => {
      this.toastr.error('Erro ao capturar dados para exibir. Tente novamente');
    })
  }

}

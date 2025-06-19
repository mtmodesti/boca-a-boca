import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { ProviderCardComponent } from '../provider-card/provider-card.component';
import { ServicesService } from '../../services/services.service';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-professionals-list',
  imports: [CommonModule, ProviderCardComponent],
  templateUrl: './professionals-list.component.html',
  styleUrl: './professionals-list.component.scss'
})
export class ProfessionalsListComponent implements OnInit, OnChanges {

  @Input() selectedValue: any = {};
  providers: any[] = [];

  constructor(private userService: UserService, private toastr: ToastrService,
    private servicesService: ServicesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedValue) {
    }
    this.getProviders();
  }

  getProviders() {
    this.loadingService.show();
    this.userService.getAllProviders(this.selectedValue?.id, true, 1, 20).subscribe({
      next: (res: any[]) => {
        this.providers = [];
        res.forEach(user => {
          if (Array.isArray(user.jobsOffered)) {
            user.jobsOffered.forEach((job: any) => {
              this.providers.push({ user, job });
            });
          }
        });
        this.loadingService.hide();
      },
      error: (err) => {
        this.loadingService.hide();
        this.toastr.error('Erro ao capturar dados para exibir. Tente novamente');
      }
    });
  }

}
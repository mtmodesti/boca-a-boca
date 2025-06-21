import { Component, inject, OnInit, effect } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GlobalDataService } from '../../services/global-data-service';
import { ToastrService } from 'ngx-toastr';
import { MatTabsModule } from '@angular/material/tabs';
import { ProviderCardComponent } from "../../components/provider-card/provider-card.component";
import { UserService } from '../../services/user-service';
import { saveEncryptedLocal } from '../../utils/utils';

@Component({
  selector: 'app-dashboard-provider',
  imports: [
    ReactiveFormsModule,
    ProviderCardComponent,
    CommonModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './dashboard-provider.component.html',
  styleUrl: './dashboard-provider.component.scss'
})
export class DashboardProviderComponent implements OnInit {

  form: FormGroup
  categories: any[] = []
  private global = inject(GlobalDataService);
  public user: any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private servicesService: ServicesService
  ) {
    this.user = this.global.user();

    this.form = this.fb.group({
      category: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateUser();
    this.getServicesCategories();

    effect(() => {
      if (this.global.dataUpdated()) {
        this.updateUser();
      }
    });
  }

  getServicesCategories() {
    this.servicesService.getCategories().subscribe((res) => {
      this.categories = res
    });
  }

  onSubmit() {
    this.addService();
  }

  addService() {
    const data = {
      categoryId: this.form.get('category')!.value.id,
      category: this.form.get('category')!.value.category,
      description: this.form.get('description')!.value
    };

    this.servicesService.addService(this.user.id, data).subscribe({
      next: (res) => {
        this.toastr.success('Serviço adicionado com sucesso');
        this.updateUser();
        this.form.reset();
      },
      error: (err) => {
        this.toastr.error('Erro ao adicionar serviço. Tente novamente');
      }
    });
  }

  updateUser() {
    this.userService.getUsers().subscribe((res) => {
      const updatedUser = res.find((e: any) => e.id === this.global.user().id);
      if (updatedUser) {
        this.global.setUser(updatedUser);
        this.user = updatedUser;
        saveEncryptedLocal('app_user', updatedUser);
      }
    });
  }

}

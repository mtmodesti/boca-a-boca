import { Component, inject, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-dashboard-provider',
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './dashboard-provider.component.html',
  styleUrl: './dashboard-provider.component.scss'
})
export class DashboardProviderComponent implements OnInit {

  form: FormGroup
  categories: any[] = []
  private global = inject(GlobalDataService);
  private user: any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private servicesService: ServicesService) {
    this.user = this.global.user();
    this.form = this.fb.group({
      category: [null, Validators.required],
      description: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.getServicesCategories()
  }


  getServicesCategories() {
    this.servicesService.getCategories().subscribe((res) => {
      console.log(res)
      this.categories = res
    })
  }

  onSubmit() {
    console.log(this.form.value)
    this.addService()
  }

  addService() {
    const data = {
      category: this.form.get('category')!.value.id,
      description: this.form.get('description')!.value
    }
    this.servicesService.addService(this.user.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Serviço adicionado com sucesso');
      },
      error: (err) => {
        this.toastr.error('Erro ao adicionar serviço. Tente novamente');
      },
      complete: () => {
      }
    });

  }


}

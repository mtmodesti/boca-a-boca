import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-header',
  imports: [CommonModule, MatSelectModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent implements OnInit {

  categories: any[] = []
  filterForm: FormGroup
  @Output() categoryValue = new EventEmitter()


  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder, private servicesServices: ServicesService) {
    this.filterForm = this.fb.group({
      category: [[]]
    })
  }

  ngOnInit(): void {
    this.getCategories()

    this.filterForm.get('category')?.valueChanges.subscribe((value) => {
      const control = this.filterForm.get('category');
      if (JSON.stringify(control?.value) !== JSON.stringify(value)) {
        control?.setValue(value);
      }
      this.categoryValue.emit(value)
    });

  }

  onSubmit() {
  }


  getCategories() {
    this.servicesServices.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Erro ao capturar categorias', err);
        this.toastr.error('Erro ao capturar categorias');
      }
    });
  }




}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-client-header',
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent {

  filterForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: [[]]
    })
  }

  onSubmit() {

  }


}

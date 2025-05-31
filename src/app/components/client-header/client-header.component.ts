import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-header',
  imports: [CommonModule, MatSelectModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent implements OnInit {

  filterForm: FormGroup
  @Output() categoryValue = new EventEmitter()


  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: [[]]
    })
  }

  ngOnInit(): void {
    this.filterForm.get('category')?.valueChanges.subscribe(value => {
      this.categoryValue.emit(value)
    });
  }

  onSubmit() {
  }

}

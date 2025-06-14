import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GlobalDataService } from '../../services/global-data-service';

@Component({
  selector: 'app-provider-profile',
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],

  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.scss'
})
export class ProviderProfileComponent {
  userForm: FormGroup
  private global = inject(GlobalDataService);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }


  onSubmit() {
    console.log(this.userForm.value)
  }

}

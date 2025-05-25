import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  hidePassword: boolean = true;
  loginForm: FormGroup

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private loadingService: LoadingService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  goToSignUp() {
    this.router.navigate(['signup'])
  }

  onSubmit() {
    console.log(this.loginForm)
  }
}

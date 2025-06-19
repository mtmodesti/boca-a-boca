import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading-service';
import { UserService } from '../../services/user-service';
import { GlobalDataService } from '../../services/global-data-service';
import { saveEncryptedLocal } from '../../utils/utils';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private global = inject(GlobalDataService);
  user = this.global.user;
  hidePassword: boolean = true;
  loginForm: FormGroup

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private loadingService: LoadingService, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const user = this.global.user();
    if (user) {
      const url = user.role === 'client' ? '/registeredJobs' : '/providerdashboard';
      this.router.navigate([url]);
    }
  }

  goToSignUp() {
    this.router.navigate(['signup'])
  }

  onSubmit() {
    this.handleLogin()
  }

  handleLogin() {
    this.loadingService.show();

    const data = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value
    };

    this.userService.getUserByEmail(data).subscribe({
      next: (res: any) => {
        const url = res.role === 'client' ? '/registeredJobs' : '/providerdashboard';
        this.global.setUser(res);
        saveEncryptedLocal('app_user', res);
        this.loadingService.hide();
        this.router.navigate([url]);
        this.toastr.success('Logado com sucesso');
      },
      error: (err) => {
        this.loadingService.hide();
        this.toastr.error('Confira as credenciais ou entre em contato.', 'Erro ao logar');
      }
    });
  }

}

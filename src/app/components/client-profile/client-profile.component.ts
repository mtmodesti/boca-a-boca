import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GlobalDataService } from '../../services/global-data-service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { LoadingService } from '../../services/loading-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-profile',
  imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent {

  userForm: FormGroup
  private global = inject(GlobalDataService);
  private user: any

  constructor(
    private toastr: ToastrService,
    private loadingService: LoadingService, private fb: FormBuilder, private userService: UserService) {
    this.user = this.global.user();
    this.userForm = this.fb.group({
      name: [this.user.name || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      birth: [this.user.birth || '', [Validators.required, this.validateDateFormat(), this.validateDateReal()]],
      role: [this.user.role || '', Validators.required],
    });
  }

  onSubmit() {
    this.loadingService.show()
    const updatedUser = this.userForm.value
    this.userService.updateUser(updatedUser, this.user.id).subscribe((res: any) => {
      this.loadingService.hide()
      this.toastr.success('Dados atualizados com sucesso');
    }, (err: any) => {
      this.loadingService.hide()
      this.toastr.error('Erro ao atualizar dados. Tente novamente');

    })

  }

  private validateDateFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(value) ? null : { invalidDateFormat: true };
    };
  }

  private validateDateReal(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      const isValid =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      return isValid ? null : { invalidDateReal: true };
    };
  }


}

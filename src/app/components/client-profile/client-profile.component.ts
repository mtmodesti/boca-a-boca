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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-client-profile',
  providers: [provideNgxMask()],

  imports: [ReactiveFormsModule, NgxMaskDirective, CommonModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent {

  userForm: FormGroup
  private global = inject(GlobalDataService);
  private user: any
  imageBase64: string | null = this.global.user()?.profilePic || null;



  constructor(
    private toastr: ToastrService,
    private loadingService: LoadingService, private fb: FormBuilder, private userService: UserService) {
    this.user = this.global.user();
    this.userForm = this.fb.group({
      name: [this.user.name || '', Validators.required],
      email: [this.user.email || '', [Validators.required, Validators.email]],
      birth: [this.user.birth || '', [Validators.required, this.validateDateFormat(), this.validateDateReal()]],
      role: [this.user.role || '', Validators.required],
      phone: [this.user.phone || '', Validators.required],

    });
    setTimeout(() => {

      console.log(this.global.user())
    }, 2000)
  }

  onSubmit() {
    this.loadingService.show()
    const updatedUser = this.imageBase64 ? {
      ...this.userForm.value,
      profilePic: this.imageBase64
    } :
      { ...this.userForm.value, }
      ;
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

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.toastr.error('Apenas arquivos de imagem são permitidos.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


}

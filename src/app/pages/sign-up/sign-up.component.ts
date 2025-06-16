import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/users';
import { UserService } from '../../services/user-service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from '../../services/loading-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  imports: [MatInputModule, CommonModule, HttpClientModule, MatButtonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  singUpForm: FormGroup
  isSubmitDisabled: boolean = true

  constructor(private toastr: ToastrService, private router: Router, private fb: FormBuilder, private userService: UserService, private loadingService: LoadingService) {
    this.singUpForm = this.fb.group({
      name: ['', Validators.required],
      birth: ['', [Validators.required, this.birthDateValidator]],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validators: [this.matchFields('email', 'confirmEmail', 'emailMismatch'), this.matchFields('password', 'confirmPassword', 'passwordMismatch')]
    });
  }

  emailMatchValidator(form: FormGroup) {
    const email = form.get('email')?.value;
    const confirmEmail = form.get('confirmEmail')?.value;

    if (email && confirmEmail && email !== confirmEmail) {
      return { emailMismatch: true };
    }

    return null;
  }

  onSubmit() {
    const payload = this.payloadBuilder()
    this.createUser(payload)

  }

  createUser(userData: User) {
    this.loadingService.show();

    this.userService.createUser(userData).subscribe({
      next: (res) => {
        this.toastr.success('Usuário criado com sucesso');
        this.router.navigate(['home']);
        this.loadingService.hide();
      },
      error: (err: any) => {
        const emailError = 'E-mail already exists';
        const isEmailError = err?.error === emailError || err?.error?.message === emailError;
        this.toastr.error(isEmailError ? 'E-mail já registrado' : 'Erro ao criar usuário. Tente novamente');
        this.loadingService.hide();
      }
    });
  }


  goToHome() {
    this.router.navigate(['/'])
  }

  matchFields(field1: string, field2: string, errorKey: string) {
    return (form: FormGroup) => {
      const value1 = form.get(field1)?.value;
      const value2 = form.get(field2)?.value;

      if (value1 !== value2) {
        form.get(field2)?.setErrors({ [errorKey]: true });
      } else {
        if (form.get(field2)?.hasError(errorKey)) {
          const errors = { ...form.get(field2)?.errors };
          delete errors[errorKey];
          form.get(field2)?.setErrors(Object.keys(errors).length ? errors : null);
        }
      }

      return null;
    }
  }

  birthDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (!regex.test(value)) {
      return { invalidDateFormat: true };
    }

    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { invalidDateReal: true };
    }

    return null;
  }

  payloadBuilder(): User {
    const newUser: User = {
      name: this.singUpForm.get('name')!.value,
      birth: this.singUpForm.get('birth')!.value,
      role: this.singUpForm.get('role')!.value,
      email: this.singUpForm.get('email')!.value,
      password: this.singUpForm.get('password')!.value,
    }
    return newUser
  }


}


import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiButton,
  TuiError,
  TuiIcon,
  TuiInput,
  TuiLabel,
  TuiTitle,
  TUI_VALIDATION_ERRORS
} from '@taiga-ui/core';
import {
  TuiPassword
} from '@taiga-ui/kit';
import { TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiError,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiInput,
    TuiLabel,
    TuiPassword,
    TuiTitle
  ],
  selector: 'app-login',
  styleUrl: './login.less',
  templateUrl: './login.html',
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Required field',
        minlength: ({ requiredLength }: { requiredLength: string }) =>
          `Minimum ${requiredLength} symbols`,
        pattern: 'Only digits and letters are allowed',
      },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.loginErrorText.set(null);
    });
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  protected form = new FormGroup({
    loginValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9]+$')]),
  });

  protected loginErrorText = signal<string | null>(null);

  protected submitLogin(): void { 
    const isLoginSuccess = this.authService.login(this.form.value.loginValue ?? '', this.form.value.passwordValue ?? '');

    if (isLoginSuccess) {
      this.form.reset();
      this.router.navigate(['/dashboard']);
    } else {
      this.loginErrorText.set('Invalid username or password');
    }
  }
}


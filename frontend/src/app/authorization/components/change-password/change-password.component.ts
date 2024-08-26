import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  cpForm: FormGroup;
  loading: boolean;
  submitted: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.cpForm = this.fb.group({
      email: [{value: this.authService.user.email, disabled: true}],
      password: [null, [Validators.required, this.passwordValidator()]],
      passwordConfirmation: [null, [Validators.required, this.confirmPasswordValidator()]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  submit() {
    this.submitted = true;
    if (this.cpForm.invalid)
      return;

    this.loading = true;

    this.authService.changePassword(
      this.password.value,
      this.passwordConfirmation.value
    )
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: (user) => {
            this.router.navigate(['/auth/login']).then(() => {
              setTimeout(() => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Erfolgreich',
                  detail: 'Passwort wurde erfolgreich zurückgesetzt.'
                });
              })
            });
          },
          error: (e) => {
            this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.'});
          }
        }
      )
  }

  get password(): AbstractControl {
    return this.cpForm.get('password');
  }

  get passwordConfirmation(): AbstractControl {
    return this.cpForm.get('passwordConfirmation');
  }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;

      if (!value) {
        return null;
      }

      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const valid = regex.test(value);

      console.log(valid)
      return valid ? null : {invalidPassword: true};
    };
  }

  private confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.cpForm?.get('password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : {passwordMismatch: true};
    };
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('passwordConfirmation');

    return password && confirmPassword && password.value === confirmPassword.value ? null : {passwordMismatch: true};
  }
}
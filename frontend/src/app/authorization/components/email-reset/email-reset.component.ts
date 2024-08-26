import { Component, Input } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Component({
  selector: 'app-email-reset',
  templateUrl: './email-reset.component.html',
  styleUrl: './email-reset.component.scss'
})
export class EmailResetComponent {
  @Input() notification: Notification
  formGroup: FormGroup
  loading: boolean;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  submit() {
    this.submitted = true;
    
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    this.authService.resetPassword(this.formGroup.value.email)
      .pipe(
        finalize(() => this.loading = false) // Ladezustand zurücksetzen, wenn der API-Aufruf beendet ist
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']).then(() => {
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Erfolgreich',
                detail: 'E-Mail wurde gesendet.'
              });
            });
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fehler',
            detail: 'E-Mail konnte nicht gesendet werden. Bitte versuche es erneut.'
          });
        }
      });
  }


  get email(): AbstractControl {
    return this.formGroup.get('email')
  }
}

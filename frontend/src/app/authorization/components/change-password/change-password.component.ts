import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs";
import {ERole} from "../../../models/user.model";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  cpForm: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.cpForm = this.fb.group({
      email: [{value: this.authService.user.email, disabled: true}],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required]
    })
  }

  submit() {
    if(this.cpForm.invalid)
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
              this.messageService.add({
                severity: 'success',
                summary: 'Erfolgreich',
                detail: 'Passwort wurde erfolgreich zurückgesetzt.'
              });
            });
          },
          error: (e) => {
            this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.' });
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

}

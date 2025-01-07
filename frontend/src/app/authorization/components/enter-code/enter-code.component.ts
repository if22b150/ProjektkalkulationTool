import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {finalize} from "rxjs";
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrl: './enter-code.component.scss'
})
export class EnterCodeComponent {
  formGroup: FormGroup;
  submitted = false;
  loading = false;
  email: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.email = JSON.parse(params['data']);
        console.log(this.email)
      }
    });
  }

  get formControls() {
    return this.formGroup.controls;
  }

  moveFocus(event: any, nextFieldId: string): void {
    if (event.target.value.length === 1) {
      const nextField = document.getElementById(nextFieldId) as HTMLElement;
      if (nextField) nextField.focus();
    }
  }

  submit(): void {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    const token = this.formGroup.value.digit1 + this.formGroup.value.digit2 +
               this.formGroup.value.digit3 + this.formGroup.value.digit4 +
               this.formGroup.value.digit5 + this.formGroup.value.digit6;

    console.log('Code als String:', token);
    this.loading = true;

    this.authService.verifyToken(this.email, token)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (user) => {
          this.router.navigate(['/auth/change-password']).then(() => {
            setTimeout(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Verifizierung erfolgreich',
                detail: 'Ein neues Passwort kann nun gesetzt werden.'
              });
            });
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Fehler',
            detail: err.error.error
          });
        }
      });
  }
}

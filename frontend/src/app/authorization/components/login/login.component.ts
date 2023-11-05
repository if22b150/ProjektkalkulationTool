import {Component, OnInit} from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {finalize} from "rxjs";
import {ERole} from "../../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  newVerifyEmail: boolean = false;
  verifyEmailSent: boolean = false;
  messages: Message[];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  submit() {
    if(this.loginForm.invalid)
      return;

    this.loading = true;
    this.verifyEmailSent = false;

    this.authService.login(
      this.email.value,
      this.password.value
    )
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        {
          next: (user) => {
            if(user.verified) {
              let route = user.role == ERole.ADMIN ? '/admin' : '/customer'
              this.router.navigate([route]).then(() => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Erfolgreich',
                  detail: 'Der Login war erfolgreich.'
                });
              });
            }
            // else {
            //   this.newVerifyEmail = true;
            //   this.messageService.add({
            //     severity: 'error',
            //     summary: 'Verifizierung ausstehend',
            //     detail: 'Bestätige deine E-Mail Adresse über die Verifizierungs-Mail in deinem Postkasten.'
            //   });
            // }
          },
          error: (e) => {
            if(e.error == "Credentials incorrect")
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Das Passwort ist inkorrekt.' });
            else if (e.error == "The selected email is invalid.")
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ungültige E-Mail-Adresse.' });
            else
              this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Es ist ein Fehler aufgetreten.' });
          }
        }
      )
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}

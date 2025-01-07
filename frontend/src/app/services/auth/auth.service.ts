import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<User>;

  public get user$(): Observable<User> {
    return this._user.asObservable();
  }

  public get user(): User {
    return this._user.value;
  }

  public set user(user: User) {
    this._user.next(user);

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  public get token(): string {
    return this._user.value?.token;
  }

  public get isLoggedInAndVerified(): boolean {
    return this._user.value != null && this.token != null && this._user.value.verified;
  }

  constructor(private http: HttpClient,
              private router: Router) {
    let savedUser = JSON.parse(localStorage.getItem('user'));
    this._user = new BehaviorSubject<User>(savedUser);
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'login', {email, password})
      .pipe(
        take(1),
        tap((user: User) => {
          this._user.next(user);
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user)); // save to local storage to be still logged in later
        })
      );
  }

  public logout() {
    return this.http.post<any>(environment.apiUrl + 'logout', {})
      .pipe(
        take(1),
        tap(() => {
          // log user out in browser
          localStorage.removeItem('user');
          this._user.next(null);
          this.router.navigate(['auth']);
        }))
      .subscribe();
  }

  public changePassword(password: string, password_confirmation: string): Observable<User>
  {
    return this.http.put<User>(environment.apiUrl + 'change-password', {password, password_confirmation})
      .pipe(
        filter(u => u != null),
        take(1),
        tap((user: User) => {
          localStorage.removeItem('user');
          this._user.next(user);
        })
      );
  }

  resetPassword(email: string) {
    return this.http.post(environment.apiUrl + 'password-reset', { email });
  }

  verifyToken(email: string, token: string): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'verify-token', { email, token })
      .pipe(
        take(1),
        tap((user: User) => {
          this._user.next(user);
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(user)); // save to local storage to be still logged in later
        })
      );
  }
}

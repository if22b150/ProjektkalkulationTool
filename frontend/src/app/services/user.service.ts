import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: BehaviorSubject<User[]>;

  public get users$(): Observable<User[]> {
    return this._users.asObservable();
  }

  public get users(): User[] {
    return this._users.value;
  }

  public set users(users: User[]) {
    sessionStorage.setItem('users', JSON.stringify(users));
    this._users.next(users);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedUsers = JSON.parse(sessionStorage.getItem('users'));
    this._users = new BehaviorSubject<User[]>(savedUsers);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<User[]>(environment.adminApiUrl + 'users')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (users) => { 
          this.users = users; 
        }
      });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `users/${id}`);
  }

  public create(name: string, facultyId: number): Observable<User> {
    const data = {
      email: name,
      faculty_id: facultyId
    };
  
    return this.http.post<User>(environment.adminApiUrl + 'users', data);
  }
}
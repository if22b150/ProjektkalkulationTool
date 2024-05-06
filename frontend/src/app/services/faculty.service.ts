import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {Faculty} from "../models/faculty.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private _faculties: BehaviorSubject<Faculty[]>;

  public get faculties$(): Observable<Faculty[]> {
    return this._faculties.asObservable();
  }

  public get faculties(): Faculty[] {
    return this._faculties.value;
  }

  public set faculties(faculties: Faculty[]) {
    sessionStorage.setItem('faculties', JSON.stringify(faculties));
    this._faculties.next(faculties);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedFaculties = JSON.parse(sessionStorage.getItem('faculties'));
    this._faculties = new BehaviorSubject<Faculty[]>(savedFaculties);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Faculty[]>(environment.adminApiUrl + 'faculties')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (faculties) => {
          this.faculties = faculties;
        }
      });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `faculties/${id}`);
  }

  public create(name: string): Observable<Faculty> {
    return this.http.post<Faculty>(environment.adminApiUrl + 'faculties', { name });
  }

  public update(id: number, name: string): Observable<Faculty> {
    return this.http.put<Faculty>(environment.adminApiUrl + `faculties/${id}`, { name });
  }
}

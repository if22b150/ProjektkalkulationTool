import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from "rxjs";
import { Lecturer } from "../models/lecturer.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {Faculty} from "../models/faculty.model";

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  private _lecturers: BehaviorSubject<Lecturer[]>;

  public get lecturers$(): Observable<Lecturer[]> {
    return this._lecturers.asObservable();
  }

  public get lecturers(): Lecturer[] {
    return this._lecturers.value;
  }

  public getLecturersGroupedByFaculty(faculties: Faculty[]) {
    return this.lecturers.filter(l => faculties.map(f => f.id).indexOf(l.faculty.id) !== -1).reduce((acc, lecturer) => {
      const existingFaculty = acc.find(item => item.value.id === lecturer.faculty.id);
      if (existingFaculty) {
        existingFaculty.items.push({label: lecturer.name, value: lecturer});
      } else {
        acc.push({ label: lecturer.faculty.name, value: lecturer.faculty, items: [{label: lecturer.name, value: lecturer}] });
      }
      return acc;
    }, []);
  }

  public set lecturers(lecturers: Lecturer[]) {
    sessionStorage.setItem('lecturers', JSON.stringify(lecturers));
    this._lecturers.next(lecturers);
  }

  constructor(private http: HttpClient) {
    let savedlecturers = JSON.parse(sessionStorage.getItem('lecturers'));
    this._lecturers = new BehaviorSubject<Lecturer[]>(savedlecturers);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  getAll(): void {
    this._loading.next(true);
    this.http.get<Lecturer[]>(environment.apiUrl + `lecturers`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (lecturers) => this.lecturers = lecturers
      });
  }

  create(name: string, hourlyRate: number, dailyRate: number, facultyId: number): Observable<Lecturer> {
    const data = {
      name: name,
      hourlyRate: hourlyRate,
      dailyRate: dailyRate
    }
    return this.http.post<Lecturer>(environment.adminApiUrl + `faculties/${facultyId}/lecturers`, data);
  }

  public update(id: number, name: string, hourlyRate: number, dailyRate: number, facultyId: number): Observable<any> {
    const data = {
      id: id,
      name: name,
      hourlyRate: hourlyRate,
      dailyRate: dailyRate,
      facultyId: facultyId,
    }
    return this.http.put<any>(environment.adminApiUrl + `faculties/${facultyId}/lecturers/${id}`, data);
  }

  delete(id: number, facultyId: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `faculties/${facultyId}/lecturers/${id}`);
  }
}

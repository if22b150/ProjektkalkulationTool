import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Lecturer} from "../models/lecturer.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

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

  constructor(private http: HttpClient) {
    this._lecturers = new BehaviorSubject<Lecturer[]>(null);
  }

  getAll(): void {
    this.http.get<Lecturer[]>(environment.apiUrl + `lecturers`)
      .subscribe(lecturers => this._lecturers.next(lecturers));

    // let lecturers: Lecturer[] = [
    //   {
    //     id: 1,
    //     name: "Fak Ltg.",
    //     hourlyRate: 55,
    //     dailyRate: 440
    //   },
    //   {
    //     id: 1,
    //     name: "Dep Ltg.",
    //     hourlyRate: 50,
    //     dailyRate: 400
    //   },
    //   {
    //     id: 1,
    //     name: "KF Ltg.",
    //     hourlyRate: 45,
    //     dailyRate: 360
    //   },
    //   {
    //     id: 1,
    //     name: "STG Ltg.",
    //     hourlyRate: 40,
    //     dailyRate: 320
    //   },
    //   {
    //     id: 1,
    //     name: "Senior L/R",
    //     hourlyRate: 30,
    //     dailyRate: 240
    //   },
    //   {
    //     id: 1,
    //     name: "Expert L/G",
    //     hourlyRate: 20,
    //     dailyRate: 160
    //   },
    //   {
    //     id: 1,
    //     name: "Junior L/G",
    //     hourlyRate: 10,
    //     dailyRate: 80
    //   },
    // ];
    // this._lecturers.next(lecturers);
  }

  // create(name: string): Observable<Lecturer> {
  //   return this.http.post<Lecturer>(environment.adminApiURL + 'grant-programs', {name});
  // }
  //
  // delete(id: number): Observable<any> {
  //   return this.http.delete<any>(environment.adminApiURL + `grant-programs/${id}`);
  // }
}

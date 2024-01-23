import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Project} from "../models/project.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _projects: BehaviorSubject<Project[]>;

  public get projects$(): Observable<Project[]> {
    return this._projects.asObservable();
  }

  public get projects(): Project[] {
    return this._projects.value;
  }

  constructor(private http: HttpClient) {
    this._projects = new BehaviorSubject<Project[]>(null);
  }

  getAllByFaculty(facultyId: number): void {
    this.http.get<Project[]>(environment.apiUrl + `faculties/${facultyId}/projects`)
      .subscribe(projects => this._projects.next(projects));
  }

  // create(name: string): Observable<Lecturer> {
  //   return this.http.post<Lecturer>(environment.adminApiURL + 'grant-programs', {name});
  // }
}

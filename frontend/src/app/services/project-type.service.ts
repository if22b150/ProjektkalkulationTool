import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectType} from "../models/project-type.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {
  private _projectTypes: BehaviorSubject<ProjectType[]>;
  private _loading: BehaviorSubject<boolean>;

  public get projectTypes$(): Observable<ProjectType[]> {
    return this._projectTypes.asObservable();
  }

  public get projectTypes(): ProjectType[] {
    return this._projectTypes.value;
  }

  public set projectTypes(projectTypes: ProjectType[]) {
    sessionStorage.setItem('projectCategories', JSON.stringify(projectTypes));
    this._projectTypes.next(projectTypes);
  }

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedprojectTypes = JSON.parse(sessionStorage.getItem('projectTypes'));
    this._projectTypes = new BehaviorSubject<ProjectType[]>(savedprojectTypes);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  getAll(): void {
    this._loading.next(true);
    this.http.get<ProjectType[]>(environment.apiUrl + `project-types`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (projectTypes) => this.projectTypes = projectTypes
      });
  }

  create(name: string, code: string, isCourse: boolean): Observable<ProjectType> {
    let data = {
      name: name,
      code: code,
      isCourse: isCourse
    }
    return this.http.post<ProjectType>(environment.adminApiUrl + 'project-types', data);
  }

  update(id: number, name: string, code: string, isCourse: boolean): Observable<ProjectType> {
    let data = {
      name: name,
      code: code,
      isCourse: isCourse
    }
    return this.http.put<ProjectType>(environment.adminApiUrl + `project-types/${id}`, data);
  }
  
  delete(id: number): Observable<ProjectType> {
    return this.http.delete<ProjectType>(environment.adminApiUrl + `project-types/${id}`);
  }
}

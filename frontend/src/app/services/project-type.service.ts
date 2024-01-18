import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectType} from "../models/project-type.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {
  private _projectTypes: BehaviorSubject<ProjectType[]>;

  public get projectTypes$(): Observable<ProjectType[]> {
    return this._projectTypes.asObservable();
  }

  public get projectTypes(): ProjectType[] {
    return this._projectTypes.value;
  }

  constructor(private http: HttpClient) {
    this._projectTypes = new BehaviorSubject<ProjectType[]>(null);
  }

  getAll(): void {
    this.http.get<ProjectType[]>(environment.apiUrl + `project-types`)
      .subscribe(projectTypes => this._projectTypes.next(projectTypes));
  }

  // create(name: string): Observable<Lecturer> {
  //   return this.http.post<Lecturer>(environment.adminApiURL + 'grant-programs', {name});
  // }
  //
  // delete(id: number): Observable<any> {
  //   return this.http.delete<any>(environment.adminApiURL + `grant-programs/${id}`);
  // }
}

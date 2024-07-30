import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { ProjectCategory } from '../models/project-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  private _projectCategorys: BehaviorSubject<ProjectCategory[]>;

  public get projectCategorys$(): Observable<ProjectCategory[]> {
    return this._projectCategorys.asObservable();
  }

  public get projectCategorys(): ProjectCategory[] {
    return this._projectCategorys.value;
  }

  public set projectCategorys(projectCategorys: ProjectCategory[]) {
    sessionStorage.setItem('projectCategorys', JSON.stringify(projectCategorys));
    this._projectCategorys.next(projectCategorys);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedProjectCategorys = JSON.parse(sessionStorage.getItem('projectCategorys'));
    this._projectCategorys = new BehaviorSubject<ProjectCategory[]>(savedProjectCategorys);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  getAll(): void {
    this._loading.next(true);
    this.http.get<ProjectCategory[]>(environment.apiUrl + `projectCategorys`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (projectCategorys) => this.projectCategorys = projectCategorys
      });
  }

  create(name: string): Observable<ProjectCategory> {
    let data = {
      name: name
    }
    return this.http.post<ProjectCategory>(environment.adminApiUrl + 'projectCategorys', data);
  }

  public update(id: number, name: string): Observable<any> {
    return this.http.put<any>(environment.adminApiUrl + `projectCategorys/${id}`, { name });
  }
  
  
  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `projectCategorys/${id}`);
  }
}

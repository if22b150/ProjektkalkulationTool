import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { ProjectCategory } from '../models/project-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  private _projectCategories: BehaviorSubject<ProjectCategory[]>;

  public get projectCategories$(): Observable<ProjectCategory[]> {
    return this._projectCategories.asObservable();
  }

  public get projectCategories(): ProjectCategory[] {
    return this._projectCategories.value;
  }

  public set projectCategories(projectCategories: ProjectCategory[]) {
    sessionStorage.setItem('projectCategories', JSON.stringify(projectCategories));
    this._projectCategories.next(projectCategories);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedprojectCategories = JSON.parse(sessionStorage.getItem('projectCategories'));
    this._projectCategories = new BehaviorSubject<ProjectCategory[]>(savedprojectCategories);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  getAll(): void {
    this._loading.next(true);
    this.http.get<ProjectCategory[]>(environment.apiUrl + `projectCategories`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (projectCategories) => this.projectCategories = projectCategories
      });
  }

  create(name: string): Observable<ProjectCategory> {
    let data = {
      name: name
    }
    return this.http.post<ProjectCategory>(environment.adminApiUrl + 'projectCategories', data);
  }

  public update(id: number, name: string): Observable<any> {
    return this.http.put<any>(environment.adminApiUrl + `projectCategories/${id}`, { name });
  }
  
  
  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `projectCategories/${id}`);
  }
}

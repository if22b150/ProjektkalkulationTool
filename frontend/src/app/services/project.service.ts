import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Project} from "../models/project.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectExpense} from "../models/project-expense.model";
import {ProjectLecturer} from "../models/project-lecturer.model";

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

  getOne(id: number, facultyId: number): Observable<Project> {
    return this.http.get<Project>(environment.apiUrl + `faculties/${facultyId}/projects/${id}`);
  }

  create(
    facultyId: number,
    projectTypeId: number,
    name: string,
    start: string,
    end: string,
    firstname: string,
    lastname: string,
    email: string,
    crossFaculty: boolean,
    notes: string,
    expenses: ProjectExpense[],
    lecturers: ProjectLecturer[],
    costs: number
  ): Observable<Project> {
    return this.http.post<Project>(
      environment.apiUrl + `faculties/${facultyId}/projects`,
      {
        projectTypeId,
        name,
        start,
        end,
        firstname,
        lastname,
        email,
        crossFaculty,
        notes,
        expenses: expenses.map(e =>({id: e.expense.id, costs: e.costs})),
        lecturers: lecturers.map(l =>({id: l.lecturer.id, hours: l.hours})),
        costs
      });
  }

  exportToCSV(facultyId: number, project: Project): Observable<any> {
    return this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/csv`);
  }

  exportToPDF(facultyId: number, project: Project): Observable<any> {
    return this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/pdf`);
  }
}

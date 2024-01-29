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

  exportToCSV(facultyId: number, project: Project) {
    this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/csv`).subscribe((response: any) => {
      this.downloadCsv(response.csv_string, 'project_' + project.id + '.csv');
    })
  }

  private downloadCsv(csvData: string, fileName: string) {
    const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'});

    // For other browsers
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

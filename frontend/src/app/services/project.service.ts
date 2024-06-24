import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, finalize, map, Observable} from "rxjs";
import {Project} from "../models/project.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectExpense} from "../models/project-expense.model";
import {ProjectLecturer} from "../models/project-lecturer.model";
import {Faculty} from "../models/faculty.model";
import {OtherExpense} from "../models/other-expense.model";
import {ProjectType} from "../models/project-type.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _projects: BehaviorSubject<Project[]>;
  private _loading: BehaviorSubject<boolean>;

  public get projects$(): Observable<Project[]> {
    return this._projects.asObservable();
  }
  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  public get projects(): Project[] {
    return this._projects.value;
  }

  public set projects(projects: Project[]) {
    this._projects.next(projects);
  }

  public addUpdatedProject(project: Project): void {
    let updated = this.projects.map(p => p.id == project.id ? project : p);
    console.log(updated);
    this._projects.next(updated);
  }

  public filteredProjects$(projectType: ProjectType, faculty: Faculty): Observable<Project[]> {
    return this._projects.asObservable().pipe(
      map(projects => projects.filter((project) => {
        return (projectType == null || project.projectType.id === projectType.id) && (faculty == null || project.faculty.id === faculty.id)
      }))
    );
  }

  constructor(private http: HttpClient) {
    this._projects = new BehaviorSubject<Project[]>(null);
    this._loading = new BehaviorSubject<boolean>(false);
  }

  getAll(): void {
    this._loading.next(true)
    this.http.get<Project[]>(environment.adminApiUrl + `projects`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe(projects => this._projects.next(projects));
  }

  getAllByFaculty(facultyId: number): void {
    this._loading.next(true)
    this.http.get<Project[]>(environment.apiUrl + `faculties/${facultyId}/projects`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe(projects => this._projects.next(projects));
  }

  getOne(id: number, facultyId: number): Observable<Project> {
    return this.http.get<Project>(environment.apiUrl + `faculties/${facultyId}/projects/${id}`);
  }

  getOneAdmin(id: number): Observable<Project> {
    return this.http.get<Project>(environment.adminApiUrl + `projects/${id}`);
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
    costs: number,
    participants: number,
    duration: number,
    crossFaculties: Faculty[]
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
        expenses: expenses.map(e =>({id: e.expense.id, costs: e.costs * 100})),
        lecturers: lecturers.map(l =>({id: l.lecturer.id, hours: l.hours, daily: l.daily})),
        costs,
        participants,
        duration,
        crossFaculties: crossFaculties.map(c => ({id: c.id}))
      });
  }

  update(
    projectId: number,
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
    costs: number,
    participants: number,
    duration: number,
    crossFaculties: Faculty[],
    priceForCoursePerDayOverride: number | null,
    otherExpenses: OtherExpense[]
  ): Observable<Project> {

    return this.http.put<Project>(
      environment.apiUrl + `faculties/${facultyId}/projects/${projectId}`,
      {
        projectId,
        facultyId,
        projectTypeId,
        name,
        start,
        end,
        firstname,
        lastname,
        email,
        crossFaculty,
        notes,
        expenses: expenses.map(e =>({id: e.expense.id, costs: e.costs * 100})),
        lecturers: lecturers.map(l =>({id: l.lecturer.id, hours: l.hours, daily: l.daily, hourlyRateOverride: l.hourlyRateOverride ? l.hourlyRateOverride * 100 : null, dailyRateOverride: l.dailyRateOverride ? l.dailyRateOverride * 100 : null})),
        costs,
        participants,
        duration,
        crossFaculties: crossFaculties.map(c => ({id: c.id})),
        priceForCoursePerDayOverride: priceForCoursePerDayOverride * 100,
        otherExpenses: otherExpenses.map(oe =>({id: oe.id, name: oe.name, perParticipant: oe.perParticipant, costs: oe.costs * 100})),
      });
  }

  exportToCSV(facultyId: number, project: Project): Observable<any> {
    return this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/csv`);
  }

  exportToPDF(facultyId: number, project: Project): Observable<any> {
    return this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/pdf`, {
      responseType: 'blob' // Important to set the response type to 'blob'
    });
  }
}

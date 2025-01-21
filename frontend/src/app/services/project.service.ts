import { Injectable } from '@angular/core';
import {finalize, map, Observable, tap} from "rxjs";
import {EProjectState, Project} from "../models/project.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProjectExpense} from "../models/project-expense.model";
import {ProjectLecturer} from "../models/project-lecturer.model";
import {Faculty} from "../models/faculty.model";
import {OtherExpense} from "../models/other-expense.model";
import {ProjectType} from "../models/project-type.model";
import {AResourceService} from "./a-resource.service";
import {finalizeLoading} from "../shared/operators/finalize-loading.operator";
import { Company } from '../models/company.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AResourceService<Project>{
  public filteredProjects$(projectType: ProjectType, faculty: Faculty, company: Company): Observable<Project[]> {
    console.log(faculty)
    return this._models.asObservable().pipe(
      map(projects => projects.filter((project) => {
        return (projectType == null || project.projectType.id === projectType.id) &&
               (faculty == null || project.faculty.id === faculty.id) &&
               (company == null || project.company.id === company.id);
      })),
      tap(filteredProjects => {
        console.log('Gefilterte Projekte:', filteredProjects); // Hier loggen
      })
    );
  }

  constructor(private http: HttpClient) {
    super('projects')
  }

  override getAll(): void {
    this._loading.next(true)
    this.http.get<Project[]>(environment.adminApiUrl + `projects`)
      .pipe(finalizeLoading(this._loading, false))
      .subscribe(projects => this.models = projects)
  }

  getAllByFaculty(facultyId: number): void {
    this._loading.next(true)
    this.http.get<Project[]>(environment.apiUrl + `faculties/${facultyId}/projects`)
      .pipe(finalizeLoading(this._loading, false))
      .subscribe(projects => this.models = projects);
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
    companyId: number,
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
    ects: number,
    crossFaculties: Faculty[]
  ): Observable<Project> {
    return this.http.post<Project>(
      environment.apiUrl + `faculties/${facultyId}/projects`,
      {
        projectTypeId,
        companyId,
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
        ects,
        crossFaculties: crossFaculties.map(c => ({id: c.id}))
      })
      .pipe(
        tap((model) => {
          this.addModel(model);
        }),
      )
  }

  update(
    projectId: number,
    facultyId: number,
    projectTypeId: number,
    companyId: number,
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
    ects: number,
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
        companyId,
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
        ects,
        crossFaculties: crossFaculties.map(c => ({id: c.id})),
        priceForCoursePerDayOverride: priceForCoursePerDayOverride * 100,
        otherExpenses: otherExpenses.map(oe =>({id: oe.id, name: oe.name, perParticipant: oe.perParticipant, costs: oe.costs * 100})),
      })
      .pipe(
        tap((model) => {
          this.updateModel(model);
        }),
      )
  }

  updateState(id: number, state: EProjectState) {
    return this.http.patch<Project>(environment.adminApiUrl + `projects/${id}/set-state`, {state})
      .pipe(
        tap((model) => {
          this.updateModel(model);
        }),
      )
  }

  exportToCSV(facultyId: number, project: Project): Observable<any> {
    return this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/csv`);
  }

  exportToPDF(facultyId: number, project: Project): Observable<any> {
    return this.http.get(environment.apiUrl + `faculties/${facultyId}/projects/${project.id}/pdf`, {
      responseType: 'blob' // Important to set the response type to 'blob'
    });
  }

  getProjectsByCompanyId(id: number): void {
    this._loading.next(true)
    this.http.get<Project[]>(environment.adminApiUrl + `projects/fetch-companies/${id}`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe(projects => this.models = projects);
  }

  getProjectsByFacultyId(id: number): void {
    this._loading.next(true)
    this.http.get<Project[]>(environment.adminApiUrl + `projects/fetch-faculties/${id}`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe(projects => this.models = projects);
  }
}

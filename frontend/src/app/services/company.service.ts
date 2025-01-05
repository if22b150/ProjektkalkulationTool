import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Company } from '../models/company.model';

@Injectable({
    providedIn: 'root'
  })

  export class CompanyService {
    private _companies: BehaviorSubject<Company[]>;

  public get companies$(): Observable<Company[]> {
    return this._companies.asObservable();
  }

  public get companies(): Company[] {
    return this._companies.value;
  }

  public set companies(companies: Company[]) {
    sessionStorage.setItem('companies', JSON.stringify(companies));
    this._companies.next(companies);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedCompanies = JSON.parse(sessionStorage.getItem('companies'));
    this._companies = new BehaviorSubject<Company[]>(savedCompanies);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  getAll(): void {
    this._loading.next(true);
    this.http.get<Company[]>(environment.adminApiUrl + `companies`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (companies) => this.companies = companies
      });
  }

  create(imageData: FormData, name: string): Observable<Company> {
    imageData.append('companyName', name);

    return this.http.post<Company>(environment.adminApiUrl + 'companies', imageData);
  }

  update(id: number, imageData: FormData, name: string): Observable<any> {
    imageData.append('companyName', name);

    return this.http.put<Company>(environment.adminApiUrl + `companies/${id}`, imageData);
  }
  
  
  delete(id: number): Observable<any> {
    return this.http.delete<Company>(environment.adminApiUrl + `companies/${id}`);
  }
}
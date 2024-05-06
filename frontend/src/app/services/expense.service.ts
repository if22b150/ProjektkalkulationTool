import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Expense} from "../models/expense.model";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private _expenses: BehaviorSubject<Expense[]>;

  public get expenses$(): Observable<Expense[]> {
    return this._expenses.asObservable();
  }

  public get expenses(): Expense[] {
    return this._expenses.value;
  }

  public set expenses(expenses: Expense[]) {
    sessionStorage.setItem('expenses', JSON.stringify(expenses));
    this._expenses.next(expenses);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    let savedExpenses = JSON.parse(sessionStorage.getItem('expenses'));
    this._expenses = new BehaviorSubject<Expense[]>(savedExpenses);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  getAll(): void {
    this._loading.next(true);
    this.http.get<Expense[]>(environment.apiUrl + `expenses`)
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (expenses) => this.expenses = expenses
      });
  }

  create(name: string): Observable<Expense> {
    let data = {
      name: name
    }
    return this.http.post<Expense>(environment.adminApiUrl + 'expenses', data);
  }

  public update(id: number, name: string): Observable<any> {
    return this.http.put<any>(environment.adminApiUrl + `expenses/${id}`, { name });
  }
  
  
  delete(id: number): Observable<any> {
    return this.http.delete<any>(environment.adminApiUrl + `expenses/${id}`);
  }
}

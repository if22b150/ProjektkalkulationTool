import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
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

  constructor(private http: HttpClient) {
    this._expenses = new BehaviorSubject<Expense[]>(null);
  }

  getAll(): void {
    this.http.get<Expense[]>(environment.apiUrl + `expenses`)
      .subscribe(expenses => this._expenses.next(expenses));
  }

  // create(name: string): Observable<Lecturer> {
  //   return this.http.post<Lecturer>(environment.adminApiURL + 'grant-programs', {name});
  // }
  //
  // delete(id: number): Observable<any> {
  //   return this.http.delete<any>(environment.adminApiURL + `grant-programs/${id}`);
  // }
}

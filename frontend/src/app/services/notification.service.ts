import { Injectable } from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Notification} from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications: BehaviorSubject<Notification[]>;

  public get notifications$(): Observable<Notification[]> {
    return this._notifications.asObservable();
  }

  public get notifications(): Notification[] {
    return this._notifications.value;
  }

  public set notifications(notifications: Notification[]) {
    this._notifications.next(notifications);
  }

  private _loading: BehaviorSubject<boolean>;

  public get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor(private http: HttpClient) {
    this._notifications = new BehaviorSubject<Notification[]>(null);
    this._loading = new BehaviorSubject<boolean>(null);
  }

  public getAll() {
    this._loading.next(true);
    this.http.get<Notification[]>(environment.adminApiUrl + 'notifications')
      .pipe(finalize(() => this._loading.next(false)))
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
        }
      });
  }

  public update(id: number, email: string, activated: boolean): Observable<Notification> {
    return this.http.put<Notification>(environment.adminApiUrl + `notifications/${id}`, { email, activated });
  }
}

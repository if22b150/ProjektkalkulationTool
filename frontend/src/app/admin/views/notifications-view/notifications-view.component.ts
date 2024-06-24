import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../shared/components/loading-spinner/loading-spinner.component";
import {NotificationFormComponent} from "../../components/notifications/notification-form/notification-form.component";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-notifications-view',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    LoadingSpinnerComponent,
    NgForOf,
    NotificationFormComponent,
    ToastModule
  ],
  templateUrl: './notifications-view.component.html',
  styleUrl: './notifications-view.component.scss'
})
export class NotificationsViewComponent implements OnInit {
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getAll();
  }

}

import {Component, OnInit} from '@angular/core';
import {LecturerService} from "../../../services/lecturer.service";
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {ExpenseService} from "../../../services/expense.service";
import {ProjectTypeService} from "../../../services/project-type.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  constructor(private lecturerService: LecturerService,
              private expenseService: ExpenseService,
              private projectTypeService: ProjectTypeService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.lecturerService.getAll();
    this.expenseService.getAll();
    this.projectTypeService.getAll();

    this.items = [
      {
        label: 'Projekte',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: 'projects'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        // routerLink: ['..', '..'],
        command: () => {
          // LOGOUT LOGIC
          this.authService.logout();
        }
      }
    ];
  }
}

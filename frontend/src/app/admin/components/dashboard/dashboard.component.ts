import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {ProjectService} from "../../../services/project.service";
import {ExpenseService} from "../../../services/expense.service";
import {LecturerService} from "../../../services/lecturer.service";
import {FacultyService} from "../../../services/faculty.service";
import {ProjectTypeService} from "../../../services/project-type.service";
import { ProjectCategoryService } from 'src/app/services/project-category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  items: MegaMenuItem[] | undefined;

  constructor(private authService: AuthService,
              private projectService: ProjectService,
              private expenseService: ExpenseService,
              private lecturerService: LecturerService,
              private projectTypeService: ProjectTypeService,
              private facultyService: FacultyService,
              private projectCategoryService: ProjectCategoryService) {
  }

  ngOnInit() {
    this.projectService.getAll();
    this.facultyService.getAll();
    this.expenseService.getAll();
    this.lecturerService.getAll();
    this.projectTypeService.getAll();
    this.projectCategoryService.getAll();

    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        routerLink: 'users'
      },
      {
        label: 'Fakultäten',
        icon: 'pi pi-fw pi-building',
        routerLink: 'faculties'
      },
      {
        label: 'Vortragende',
        icon: 'pi pi-fw pi-users',
        routerLink: 'lecturer'
      },
      {
        label: 'Aufwände',
        icon: 'pi pi-fw pi-folder-open',
        routerLink: 'expenses'
      },
      {
        label: 'Projektarten',
        icon: 'pi pi-fw pi-folder',
        routerLink: 'projectCategory'
      },
      {
        label: 'Projekte',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: 'projects'
      },
      {
        label: 'Benachrichtigungen',
        icon: 'pi pi-fw pi-envelope',
        routerLink: 'notifications'
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


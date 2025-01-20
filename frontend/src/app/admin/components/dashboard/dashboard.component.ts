import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {ProjectService} from "../../../services/project.service";
import {ExpenseService} from "../../../services/expense.service";
import {LecturerService} from "../../../services/lecturer.service";
import {FacultyService} from "../../../services/faculty.service";
import {ProjectTypeService} from "../../../services/project-type.service";
import {ProjectCategoryService} from 'src/app/services/project-category.service';
import {CompanyService} from 'src/app/services/company.service';
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: MegaMenuItem[] | undefined
  services = [
    this.projectService,
    this.facultyService,
    this.expenseService,
    this.lecturerService,
    this.projectTypeService,
    this.projectCategoryService,
    this.notificationService,
    this.companyService
  ]

  constructor(public authService: AuthService,
              private projectService: ProjectService,
              private expenseService: ExpenseService,
              private lecturerService: LecturerService,
              private projectTypeService: ProjectTypeService,
              private facultyService: FacultyService,
              private notificationService: NotificationService,
              private projectCategoryService: ProjectCategoryService,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.services.forEach((service: any) => {
      service.getAll()
    })

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
        label: 'Kunden',
        icon: 'pi pi-fw pi-address-book',
        routerLink: 'companies'
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
        command: () => this.logout()
      }
    ];

    this.authService.logoutLoading$.subscribe(
      {
        next: (loading) => {
          let logoutItem = {
            label: 'Logout',
            icon: loading ? 'pi pi-spin pi-spinner' : 'pi pi-fw pi-sign-out',
            command: () => loading ? {} : this.logout()
          }
          if(loading) {
            this.items = this.items.map(i => i.label == 'Logout' ? logoutItem : i)
          }
        }
      }
    )
  }

  logout() {
    this.authService.logoutLoading = true
    this.services.forEach((service: any) => {
      service.reset()
    })
    this.authService.logout();
  }
}


import {Component, OnInit} from '@angular/core';
import {LecturerService} from "../../../services/lecturer.service";
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {ExpenseService} from "../../../services/expense.service";
import {ProjectTypeService} from "../../../services/project-type.service";
import {ProjectService} from "../../../services/project.service";
import {FacultyService} from "../../../services/faculty.service";
import {CompanyService} from "../../../services/company.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
  services = [
    this.projectService,
    this.facultyService,
    this.expenseService,
    this.lecturerService,
    this.projectTypeService,
    this.companyService
  ]

  constructor(private lecturerService: LecturerService,
              private facultyService: FacultyService,
              private expenseService: ExpenseService,
              private projectTypeService: ProjectTypeService,
              private projectService: ProjectService,
              private companyService: CompanyService,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.services.forEach((service: any) => {
      if(service instanceof ProjectService)
        service.getAllByFaculty(this.authService.user.faculty.id)
      else if(service instanceof FacultyService)
        service.getAll(true)
      else
        service.getAll()
    })

    this.items = [
      {
        label: 'Projekte',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: 'projects'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout()
      }
    ]

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

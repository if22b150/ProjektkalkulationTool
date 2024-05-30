import {Component, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  items: MegaMenuItem[] | undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
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
        label: 'Projekte',
        icon: 'pi pi-fw pi-cog',
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


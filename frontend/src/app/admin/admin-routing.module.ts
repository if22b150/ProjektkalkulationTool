import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UsersComponent} from "./components/users/users.component";
import {FacultyViewComponent} from "./views/faculty-view/faculty-view.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'faculties', component: FacultyViewComponent },
      { path: 'settings', component: SettingsComponent },
      {path: '', redirectTo: '/admin/users', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {UsersViewComponent} from "./views/users-view/users-view.component";
import {FacultyViewComponent} from "./views/faculty-view/faculty-view.component";
import { LecturerViewComponent } from './views/lecturer-view/lecturer-view.component';
import { ExpensesViewComponent } from './views/expenses-view/expenses-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'users', component: UsersViewComponent },
      { path: 'faculties', component: FacultyViewComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'lecturer', component: LecturerViewComponent},
      { path: 'expenses', component: ExpensesViewComponent },
      {path: '', redirectTo: '/admin/users', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

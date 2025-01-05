import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UsersViewComponent} from "./views/users-view/users-view.component";
import {FacultyViewComponent} from "./views/faculty-view/faculty-view.component";
import { LecturerViewComponent } from './views/lecturer-view/lecturer-view.component';
import { ExpensesViewComponent } from './views/expenses-view/expenses-view.component';
import {ProjectsViewComponent} from "./views/projects-view/projects-view.component";
import {EditProjectComponent} from "../customer/components/projects/edit-project/edit-project.component";
import {NotificationsViewComponent} from "./views/notifications-view/notifications-view.component";
import { ProjectCategoryViewComponent } from './views/project-category-view/project-category-view.component';
import { CompaniesViewComponent } from './views/companies-view/companies-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'users', component: UsersViewComponent },
      { path: 'faculties', component: FacultyViewComponent },
      { path: 'notifications', component: NotificationsViewComponent },
      { path: 'lecturer', component: LecturerViewComponent},
      { path: 'expenses', component: ExpensesViewComponent },
      { path: 'projects', component: ProjectsViewComponent },
      { path: 'projects/:id', component: EditProjectComponent },
      { path: 'projectCategory', component: ProjectCategoryViewComponent},
      { path: 'companies', component: CompaniesViewComponent},
      {path: '', redirectTo: '/admin/users', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

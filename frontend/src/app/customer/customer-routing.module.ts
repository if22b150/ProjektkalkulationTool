import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {NewProjectComponent} from "./components/projects/new-project/new-project.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/new-project', component: NewProjectComponent },
      // { path: 'faculties', component: FacultiesComponent },
      // { path: 'settings', component: SettingsComponent },
      {path: '', redirectTo: '/customer/projects', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

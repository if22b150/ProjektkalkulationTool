import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {AutoFocusModule} from "primeng/autofocus";
import {MessageService} from "primeng/api";
import {MegaMenuModule} from "primeng/megamenu";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SharedModule} from "../shared/shared.module";
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import {CardModule} from "primeng/card";
import { DialogModule } from 'primeng/dialog';
import { FacultyViewComponent } from './views/faculty-view/faculty-view.component';
import { DeleteFacultyComponent } from './views/faculty-view/delete-faculty/delete-faculty.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { UsersViewComponent } from './views/users-view/users-view.component';
import { DeleteUserComponent } from './views/users-view/delete-user/delete-user.component';
import { DropdownModule } from 'primeng/dropdown';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerViewComponent } from './views/lecturer-view/lecturer-view.component';
import { ExpensesViewComponent } from './views/expenses-view/expenses-view.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { DeleteExpenseComponent } from './views/expenses-view/delete-expense/delete-expense.component';
import { LecturerDeleteComponent } from './views/lecturer-view/lecturer-delete/lecturer-delete.component';
import { UpdateFacultyComponent } from './views/faculty-view/update-faculty/update-faculty.component';
import { UpdateExpensesComponent } from './views/expenses-view/update-expenses/update-expenses.component';
import { LecturerUpdateComponent } from './views/lecturer-view/lecturer-update/lecturer-update.component';
import {InputNumberModule} from "primeng/inputnumber";
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsViewComponent } from './views/projects-view/projects-view.component';

@NgModule({
  providers: [
    MessageService
  ],
  declarations: [
    DashboardComponent,
    SettingsComponent,
    UsersComponent,
    FacultiesComponent,
    FacultyViewComponent,
    DeleteFacultyComponent,
    UsersViewComponent,
    DeleteUserComponent,
    LecturerComponent,
    LecturerViewComponent,
    ExpensesViewComponent,
    ExpensesComponent,
    DeleteExpenseComponent,
    LecturerDeleteComponent,
    UpdateFacultyComponent,
    UpdateExpensesComponent,
    LecturerUpdateComponent,
    ProjectsComponent,
    ProjectsViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    AutoFocusModule,
    MegaMenuModule,
    CardModule,
    DialogModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class AdminModule { }

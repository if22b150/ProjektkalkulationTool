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
import { FileUploadModule } from 'primeng/fileupload';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
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
import { ProjectsViewComponent } from './views/projects-view/projects-view.component';
import {LoadingSpinnerComponent} from "../shared/components/loading-spinner/loading-spinner.component";
import {ProjectsComponent} from "../customer/components/projects/projects.component";
import { DeleteProjectCategoryComponent } from './views/project-category-view/delete-project-category/delete-project-category.component';
import { UpdateProjectCategoryComponent } from './views/project-category-view/update-project-category/update-project-category.component';
import { ProjectCategoryComponent } from './components/project-category/project-category.component';
import { ProjectCategoryViewComponent } from './views/project-category-view/project-category-view.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompaniesViewComponent } from './views/companies-view/companies-view.component';
import { UpdateCompanyComponent } from './views/companies-view/update-company/update-company.component';
import { DeleteCompanyComponent } from './views/companies-view/delete-company/delete-company.component';
import { CompanyDetailsComponent } from './views/companies-view/company-details/company-details.component';
import {FloatLabelModule} from "primeng/floatlabel";
import { FacultyDetailsComponent } from './views/faculty-view/faculty-details/faculty-details.component';

@NgModule({
  providers: [
    MessageService
  ],
  declarations: [
    DashboardComponent,
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
    ProjectsViewComponent,
    ProjectCategoryComponent,
    ProjectCategoryViewComponent,
    UpdateProjectCategoryComponent,
    DeleteProjectCategoryComponent,
    CompaniesComponent,
    CompaniesViewComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    CompanyDetailsComponent,
    FacultyDetailsComponent
  ],
  imports: [
    CommonModule,
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
    InputNumberModule,
    LoadingSpinnerComponent,
    ProjectsComponent,
    FileUploadModule,
    FloatLabelModule
  ]
})
export class AdminModule { }

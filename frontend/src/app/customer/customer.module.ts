import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerRoutingModule} from "./customer-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {AutoFocusModule} from "primeng/autofocus";
import {MessageService} from "primeng/api";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { ProjectsComponent } from './components/projects/projects.component';
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import { ProjectLecturersComponent } from './components/projects/new-project/project-lecturers/project-lecturers.component';
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {MegaMenuModule} from "primeng/megamenu";
import {SharedModule} from "../shared/shared.module";
import {MultiSelectModule} from "primeng/multiselect";
import { ProjectExpensesComponent } from './components/projects/new-project/project-expenses/project-expenses.component';

@NgModule({
  providers: [
    MessageService
  ],
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    NewProjectComponent,
    ProjectLecturersComponent,
    ProjectExpensesComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    MessagesModule,
    ToastModule,
    InputTextModule,
    AutoFocusModule,
    DropdownModule,
    InputNumberModule,
    MegaMenuModule,
    MultiSelectModule,
    SharedModule
  ]
})
export class CustomerModule { }

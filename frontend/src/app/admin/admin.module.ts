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
    DeleteFacultyComponent
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
    TableModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import { NewProjectComponent } from './components/projects/new-project/new-project.component';
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {MegaMenuModule} from "primeng/megamenu";
import {MultiSelectModule} from "primeng/multiselect";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {ProjectFormComponent} from "./components/projects/project-form/project-form.component";
import {LoadingSpinnerComponent} from "../shared/components/loading-spinner/loading-spinner.component";

@NgModule({
  providers: [
    MessageService,
    DatePipe
  ],
  declarations: [
    DashboardComponent,
    NewProjectComponent,
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
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    InputTextareaModule,
    InputSwitchModule,
    ProjectFormComponent,
    LoadingSpinnerComponent
  ]
})
export class CustomerModule { }

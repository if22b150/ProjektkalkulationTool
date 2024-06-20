import {Component, Input} from '@angular/core';
import {ProjectService} from "../../../services/project.service";
import {Button} from "primeng/button";
import {AsyncPipe, CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {ExportButtonsComponent} from "./export-buttons/export-buttons.component";
import {LoadingSpinnerComponent} from "../../../shared/components/loading-spinner/loading-spinner.component";
import {ToastModule} from "primeng/toast";
import {AuthService} from "../../../services/auth/auth.service";
import {ERole} from "../../../models/user.model";
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  imports: [
    Button,
    AsyncPipe,
    Ripple,
    RouterLink,
    CurrencyPipe,
    ExportButtonsComponent,
    NgForOf,
    LoadingSpinnerComponent,
    ToastModule,
    NgIf,
    BadgeModule,
    NgClass
  ],
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  constructor(public projectService: ProjectService,
              public authService: AuthService) {
  }

  isOpened = true;

  protected readonly ERole = ERole;
}

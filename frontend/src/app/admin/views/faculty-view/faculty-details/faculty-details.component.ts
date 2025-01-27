import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import {ProjectTypeService} from "src/app/services/project-type.service";
import {FacultyService} from "src/app/services/faculty.service";

@Component({
  selector: 'app-faculty-details',
  templateUrl: './faculty-details.component.html',
  styleUrl: './faculty-details.component.scss'
})
export class FacultyDetailsComponent {
  faculty: Company = null;
  projects: Project[];

  constructor(private route: ActivatedRoute,
              public projectService: ProjectService,
              public projectTypeService: ProjectTypeService,
              public facultyService: FacultyService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const facultyData = params['faculty'];
      if (facultyData) {
        this.faculty = JSON.parse(facultyData);  // Parse the JSON string back to an object
      }
    });
  }
}

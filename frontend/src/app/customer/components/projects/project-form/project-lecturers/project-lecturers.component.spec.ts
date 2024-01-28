import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLecturersComponent } from './project-lecturers.component';

describe('ProjectLecturersComponent', () => {
  let component: ProjectLecturersComponent;
  let fixture: ComponentFixture<ProjectLecturersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectLecturersComponent]
    });
    fixture = TestBed.createComponent(ProjectLecturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

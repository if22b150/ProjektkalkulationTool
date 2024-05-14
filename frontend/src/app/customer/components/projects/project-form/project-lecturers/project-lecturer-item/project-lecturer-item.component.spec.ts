import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLecturerItemComponent } from './project-lecturer-item.component';

describe('ProjectLecturerItemComponent', () => {
  let component: ProjectLecturerItemComponent;
  let fixture: ComponentFixture<ProjectLecturerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectLecturerItemComponent]
    });
    fixture = TestBed.createComponent(ProjectLecturerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

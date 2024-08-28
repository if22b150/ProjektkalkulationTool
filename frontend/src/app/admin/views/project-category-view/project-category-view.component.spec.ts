import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCategoryViewComponent } from './project-category-view.component';

describe('ProjectCategoryViewComponent', () => {
  let component: ProjectCategoryViewComponent;
  let fixture: ComponentFixture<ProjectCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCategoryViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

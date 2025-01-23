import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGroupSpecificExpensesComponent } from './project-group-specific-expenses.component';

describe('ProjectGroupSpecificExpensesComponent', () => {
  let component: ProjectGroupSpecificExpensesComponent;
  let fixture: ComponentFixture<ProjectGroupSpecificExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGroupSpecificExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectGroupSpecificExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

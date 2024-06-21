import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOtherExpensesComponent } from './project-other-expenses.component';

describe('ProjectOtherExpensesComponent', () => {
  let component: ProjectOtherExpensesComponent;
  let fixture: ComponentFixture<ProjectOtherExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectOtherExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectOtherExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectCategoryComponent } from './update-project-category.component';

describe('UpdateProjectCategoryComponent', () => {
  let component: UpdateProjectCategoryComponent;
  let fixture: ComponentFixture<UpdateProjectCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProjectCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

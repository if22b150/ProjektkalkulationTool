import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesViewComponent } from './companies-view.component';

describe('CompaniesViewComponent', () => {
  let component: CompaniesViewComponent;
  let fixture: ComponentFixture<CompaniesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompaniesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesViewComponent } from './expenses-view.component';

describe('ExpensesViewComponent', () => {
  let component: ExpensesViewComponent;
  let fixture: ComponentFixture<ExpensesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesViewComponent]
    });
    fixture = TestBed.createComponent(ExpensesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

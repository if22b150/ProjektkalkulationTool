import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerViewComponent } from './lecturer-view.component';

describe('LecturerViewComponent', () => {
  let component: LecturerViewComponent;
  let fixture: ComponentFixture<LecturerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturerViewComponent]
    });
    fixture = TestBed.createComponent(LecturerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

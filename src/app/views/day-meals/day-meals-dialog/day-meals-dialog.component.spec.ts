import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMealsDialogComponent } from './day-meals-dialog.component';

describe('DayMealsDialogComponent', () => {
  let component: DayMealsDialogComponent;
  let fixture: ComponentFixture<DayMealsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayMealsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayMealsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

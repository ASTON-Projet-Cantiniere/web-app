import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekMealsComponent } from './day-meals.component';

describe('WeekMealsComponent', () => {
  let component: WeekMealsComponent;
  let fixture: ComponentFixture<WeekMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekMealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

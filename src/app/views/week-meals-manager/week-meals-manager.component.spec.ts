import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekMealsManagerComponent } from './week-meals-manager.component';

describe('WeekMealsManagerComponent', () => {
  let component: WeekMealsManagerComponent;
  let fixture: ComponentFixture<WeekMealsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekMealsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekMealsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

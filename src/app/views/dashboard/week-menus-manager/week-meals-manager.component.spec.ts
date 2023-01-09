import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekMenusManagerComponent } from './week-menus-manager.component';

describe('WeekMealsManagerComponent', () => {
  let component: WeekMenusManagerComponent;
  let fixture: ComponentFixture<WeekMenusManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekMenusManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekMenusManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

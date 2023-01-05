import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsManagerComponent } from './ingredients-manager.component';

describe('IngredientsManagerComponent', () => {
  let component: IngredientsManagerComponent;
  let fixture: ComponentFixture<IngredientsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientsManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

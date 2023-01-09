import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConstraintsComponent } from './update-constraints.component';

describe('UpdateConstraintsComponent', () => {
  let component: UpdateConstraintsComponent;
  let fixture: ComponentFixture<UpdateConstraintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConstraintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateConstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

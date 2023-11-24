import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutineComponent } from './create-routine.component';

describe('CreateRoutineComponent', () => {
  let component: CreateRoutineComponent;
  let fixture: ComponentFixture<CreateRoutineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoutineComponent]
    });
    fixture = TestBed.createComponent(CreateRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

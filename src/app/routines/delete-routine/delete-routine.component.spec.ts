import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoutineComponent } from './delete-routine.component';

describe('DeleteRoutineComponent', () => {
  let component: DeleteRoutineComponent;
  let fixture: ComponentFixture<DeleteRoutineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRoutineComponent]
    });
    fixture = TestBed.createComponent(DeleteRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

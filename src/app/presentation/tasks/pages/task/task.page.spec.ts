import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TaskPage } from './task.page';

describe('TaskPage', () => {
  let fixture: ComponentFixture<TaskPage>;
  let component: TaskPage;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
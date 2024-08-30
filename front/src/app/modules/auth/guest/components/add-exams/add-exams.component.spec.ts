import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamsComponent } from './add-exams.component';

describe('AddExamsComponent', () => {
  let component: AddExamsComponent;
  let fixture: ComponentFixture<AddExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

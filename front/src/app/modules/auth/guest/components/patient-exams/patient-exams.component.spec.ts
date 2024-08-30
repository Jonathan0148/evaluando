import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientExamsComponent } from './patient-exams.component';

describe('PatientExamsComponent', () => {
  let component: PatientExamsComponent;
  let fixture: ComponentFixture<PatientExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientExamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

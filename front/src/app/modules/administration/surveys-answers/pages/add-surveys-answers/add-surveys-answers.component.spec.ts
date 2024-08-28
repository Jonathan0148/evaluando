import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveysAnswersComponent } from './add-surveys-answers.component';

describe('AddSurveysAnswersComponent', () => {
  let component: AddSurveysAnswersComponent;
  let fixture: ComponentFixture<AddSurveysAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSurveysAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSurveysAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

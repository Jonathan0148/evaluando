import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysAnswersComponent } from './surveys-answers.component';

describe('SurveysAnswersComponent', () => {
  let component: SurveysAnswersComponent;
  let fixture: ComponentFixture<SurveysAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveysAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveysAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

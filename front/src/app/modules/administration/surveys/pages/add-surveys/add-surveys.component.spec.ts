import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveysComponent } from './add-surveys.component';

describe('AddSurveysComponent', () => {
  let component: AddSurveysComponent;
  let fixture: ComponentFixture<AddSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSurveysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

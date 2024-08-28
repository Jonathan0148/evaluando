import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypesExamsComponent } from './add-types-exams.component';

describe('AddTypesExamsComponent', () => {
  let component: AddTypesExamsComponent;
  let fixture: ComponentFixture<AddTypesExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypesExamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTypesExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

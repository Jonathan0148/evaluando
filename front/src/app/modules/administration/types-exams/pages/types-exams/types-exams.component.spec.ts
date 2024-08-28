import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesExamsComponent } from './types-exams.component';

describe('TypesExamsComponent', () => {
  let component: TypesExamsComponent;
  let fixture: ComponentFixture<TypesExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesExamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypesExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

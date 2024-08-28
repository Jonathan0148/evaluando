import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypesResultsComponent } from './add-types-results.component';

describe('AddTypesResultsComponent', () => {
  let component: AddTypesResultsComponent;
  let fixture: ComponentFixture<AddTypesResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypesResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTypesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

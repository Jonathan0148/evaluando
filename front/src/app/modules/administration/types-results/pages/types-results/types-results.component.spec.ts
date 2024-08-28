import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesResultsComponent } from './types-results.component';

describe('TypesResultsComponent', () => {
  let component: TypesResultsComponent;
  let fixture: ComponentFixture<TypesResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypesResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

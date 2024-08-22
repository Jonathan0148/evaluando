import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeadquartersComponent } from './add-headquarters.component';

describe('AddHeadquartersComponent', () => {
  let component: AddHeadquartersComponent;
  let fixture: ComponentFixture<AddHeadquartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeadquartersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHeadquartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

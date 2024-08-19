import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialModalComponent } from './initial-modal.component';

describe('InitialModalComponent', () => {
  let component: InitialModalComponent;
  let fixture: ComponentFixture<InitialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

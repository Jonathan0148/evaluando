import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCheckCodeComponent } from './modal-check-code.component';

describe('ModalCheckCodeComponent', () => {
  let component: ModalCheckCodeComponent;
  let fixture: ComponentFixture<ModalCheckCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCheckCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCheckCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

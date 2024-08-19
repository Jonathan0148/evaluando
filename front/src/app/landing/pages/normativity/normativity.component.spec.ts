import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativityComponent } from './normativity.component';

describe('NormativityComponent', () => {
  let component: NormativityComponent;
  let fixture: ComponentFixture<NormativityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormativityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormativityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

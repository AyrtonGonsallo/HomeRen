import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePoseSolComponent } from './formulaire-pose-sol.component';

describe('FormulairePoseSolComponent', () => {
  let component: FormulairePoseSolComponent;
  let fixture: ComponentFixture<FormulairePoseSolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePoseSolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePoseSolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

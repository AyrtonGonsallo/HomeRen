import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePosePorteComponent } from './formulaire-pose-porte.component';

describe('FormulairePosePorteComponent', () => {
  let component: FormulairePosePorteComponent;
  let fixture: ComponentFixture<FormulairePosePorteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePosePorteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePosePorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

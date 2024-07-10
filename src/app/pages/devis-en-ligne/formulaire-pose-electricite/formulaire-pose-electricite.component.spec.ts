import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePoseElectriciteComponent } from './formulaire-pose-electricite.component';

describe('FormulairePoseElectriciteComponent', () => {
  let component: FormulairePoseElectriciteComponent;
  let fixture: ComponentFixture<FormulairePoseElectriciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePoseElectriciteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePoseElectriciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

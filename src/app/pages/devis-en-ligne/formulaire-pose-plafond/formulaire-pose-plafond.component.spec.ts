import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePosePlafondComponent } from './formulaire-pose-plafond.component';

describe('FormulairePosePlafondComponent', () => {
  let component: FormulairePosePlafondComponent;
  let fixture: ComponentFixture<FormulairePosePlafondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePosePlafondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePosePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

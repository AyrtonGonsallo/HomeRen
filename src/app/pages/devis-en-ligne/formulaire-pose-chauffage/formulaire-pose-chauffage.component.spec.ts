import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePoseChauffageComponent } from './formulaire-pose-chauffage.component';

describe('FormulairePoseChauffageComponent', () => {
  let component: FormulairePoseChauffageComponent;
  let fixture: ComponentFixture<FormulairePoseChauffageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePoseChauffageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePoseChauffageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

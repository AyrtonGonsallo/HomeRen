import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCreationMursNonPorteursComponent } from './formulaire-creation-murs-non-porteurs.component';

describe('FormulaireCreationMursNonPorteursComponent', () => {
  let component: FormulaireCreationMursNonPorteursComponent;
  let fixture: ComponentFixture<FormulaireCreationMursNonPorteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaireCreationMursNonPorteursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulaireCreationMursNonPorteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

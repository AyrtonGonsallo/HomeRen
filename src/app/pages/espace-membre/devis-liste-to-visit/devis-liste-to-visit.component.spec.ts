import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisListeToVisitComponent } from './devis-liste-to-visit.component';

describe('DevisListeToVisitComponent', () => {
  let component: DevisListeToVisitComponent;
  let fixture: ComponentFixture<DevisListeToVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevisListeToVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisListeToVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

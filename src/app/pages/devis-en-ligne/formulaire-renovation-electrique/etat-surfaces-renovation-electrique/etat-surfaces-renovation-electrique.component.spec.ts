import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatSurfacesRenovationElectriqueComponent } from './etat-surfaces-renovation-electrique.component';

describe('EtatSurfacesRenovationElectriqueComponent', () => {
  let component: EtatSurfacesRenovationElectriqueComponent;
  let fixture: ComponentFixture<EtatSurfacesRenovationElectriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatSurfacesRenovationElectriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatSurfacesRenovationElectriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

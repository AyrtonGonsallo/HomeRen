import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatSurfacesComponent } from './etat-surfaces.component';

describe('EtatSurfacesComponent', () => {
  let component: EtatSurfacesComponent;
  let fixture: ComponentFixture<EtatSurfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatSurfacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatSurfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

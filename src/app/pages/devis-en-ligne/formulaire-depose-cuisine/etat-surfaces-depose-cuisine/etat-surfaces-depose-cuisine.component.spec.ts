import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatSurfacesDeposeCuisineComponent } from './etat-surfaces-depose-cuisine.component';

describe('EtatSurfacesDeposeCuisineComponent', () => {
  let component: EtatSurfacesDeposeCuisineComponent;
  let fixture: ComponentFixture<EtatSurfacesDeposeCuisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatSurfacesDeposeCuisineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatSurfacesDeposeCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatSurfacesDemolitionCloisonsComponent } from './etat-surfaces-demolition-cloisons.component';

describe('EtatSurfacesDemolitionCloisonsComponent', () => {
  let component: EtatSurfacesDemolitionCloisonsComponent;
  let fixture: ComponentFixture<EtatSurfacesDemolitionCloisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatSurfacesDemolitionCloisonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatSurfacesDemolitionCloisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

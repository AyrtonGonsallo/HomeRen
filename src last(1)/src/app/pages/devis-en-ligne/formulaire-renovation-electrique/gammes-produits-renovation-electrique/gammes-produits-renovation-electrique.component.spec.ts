import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammesProduitsRenovationElectriqueComponent } from './gammes-produits-renovation-electrique.component';

describe('GammesProduitsRenovationElectriqueComponent', () => {
  let component: GammesProduitsRenovationElectriqueComponent;
  let fixture: ComponentFixture<GammesProduitsRenovationElectriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GammesProduitsRenovationElectriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GammesProduitsRenovationElectriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

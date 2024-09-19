import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammesProduitsDeposeCuisineComponent } from './gammes-produits-depose-cuisine.component';

describe('GammesProduitsDeposeCuisineComponent', () => {
  let component: GammesProduitsDeposeCuisineComponent;
  let fixture: ComponentFixture<GammesProduitsDeposeCuisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GammesProduitsDeposeCuisineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GammesProduitsDeposeCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

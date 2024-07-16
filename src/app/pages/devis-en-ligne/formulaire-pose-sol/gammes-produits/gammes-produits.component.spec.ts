import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammesProduitsComponent } from './gammes-produits.component';

describe('GammesProduitsComponent', () => {
  let component: GammesProduitsComponent;
  let fixture: ComponentFixture<GammesProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GammesProduitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GammesProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

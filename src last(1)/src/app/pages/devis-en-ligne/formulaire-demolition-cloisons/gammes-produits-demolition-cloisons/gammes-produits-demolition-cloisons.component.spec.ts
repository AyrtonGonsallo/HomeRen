import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammesProduitsDemolitionCloisonsComponent } from './gammes-produits-demolition-cloisons.component';

describe('GammesProduitsDemolitionCloisonsComponent', () => {
  let component: GammesProduitsDemolitionCloisonsComponent;
  let fixture: ComponentFixture<GammesProduitsDemolitionCloisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GammesProduitsDemolitionCloisonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GammesProduitsDemolitionCloisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

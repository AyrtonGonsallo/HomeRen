import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GammesProduitsPoseAppSanComponent } from './gammes-produits-pose-app-san.component';

describe('GammesProduitsPoseAppSanComponent', () => {
  let component: GammesProduitsPoseAppSanComponent;
  let fixture: ComponentFixture<GammesProduitsPoseAppSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GammesProduitsPoseAppSanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GammesProduitsPoseAppSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatsSurfacesPoseAppSanComponent } from './etats-surfaces-pose-app-san.component';

describe('EtatsSurfacesPoseAppSanComponent', () => {
  let component: EtatsSurfacesPoseAppSanComponent;
  let fixture: ComponentFixture<EtatsSurfacesPoseAppSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatsSurfacesPoseAppSanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatsSurfacesPoseAppSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsPoseAppSanComponent } from './dimensions-pose-app-san.component';

describe('DimensionsPoseAppSanComponent', () => {
  let component: DimensionsPoseAppSanComponent;
  let fixture: ComponentFixture<DimensionsPoseAppSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionsPoseAppSanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DimensionsPoseAppSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

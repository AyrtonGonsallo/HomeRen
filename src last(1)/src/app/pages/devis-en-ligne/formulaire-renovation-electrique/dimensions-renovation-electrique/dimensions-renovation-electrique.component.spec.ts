import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsRenovationElectriqueComponent } from './dimensions-renovation-electrique.component';

describe('DimensionsRenovationElectriqueComponent', () => {
  let component: DimensionsRenovationElectriqueComponent;
  let fixture: ComponentFixture<DimensionsRenovationElectriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionsRenovationElectriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DimensionsRenovationElectriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

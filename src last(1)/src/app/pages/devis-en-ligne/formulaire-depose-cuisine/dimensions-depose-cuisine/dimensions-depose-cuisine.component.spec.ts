import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsDeposeCuisineComponent } from './dimensions-depose-cuisine.component';

describe('DimensionsDeposeCuisineComponent', () => {
  let component: DimensionsDeposeCuisineComponent;
  let fixture: ComponentFixture<DimensionsDeposeCuisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionsDeposeCuisineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DimensionsDeposeCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

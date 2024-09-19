import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsDemolitionCloisonsComponent } from './dimensions-demolition-cloisons.component';

describe('DimensionsDemolitionCloisonsComponent', () => {
  let component: DimensionsDemolitionCloisonsComponent;
  let fixture: ComponentFixture<DimensionsDemolitionCloisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DimensionsDemolitionCloisonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DimensionsDemolitionCloisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

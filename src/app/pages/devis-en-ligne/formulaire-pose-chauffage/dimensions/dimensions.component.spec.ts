import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoseChauffageDimensionsComponent } from './dimensions.component';

describe('PoseChauffageDimensionsComponent', () => {
  let component: PoseChauffageDimensionsComponent;
  let fixture: ComponentFixture<PoseChauffageDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoseChauffageDimensionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoseChauffageDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

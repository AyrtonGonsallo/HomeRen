import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPoseElectriciteComponent } from './recap-pose-electricite.component';

describe('RecapPoseElectriciteComponent', () => {
  let component: RecapPoseElectriciteComponent;
  let fixture: ComponentFixture<RecapPoseElectriciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPoseElectriciteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPoseElectriciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

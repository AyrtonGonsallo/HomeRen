import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPosePortesComponent } from './recap-pose-portes.component';

describe('RecapPosePortesComponent', () => {
  let component: RecapPosePortesComponent;
  let fixture: ComponentFixture<RecapPosePortesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPosePortesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPosePortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

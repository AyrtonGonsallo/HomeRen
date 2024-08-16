import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPoseCreationMursNonPorteursComponent } from './recap-pose-creation-murs-non-porteurs.component';

describe('RecapPoseCreationMursNonPorteursComponent', () => {
  let component: RecapPoseCreationMursNonPorteursComponent;
  let fixture: ComponentFixture<RecapPoseCreationMursNonPorteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPoseCreationMursNonPorteursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPoseCreationMursNonPorteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

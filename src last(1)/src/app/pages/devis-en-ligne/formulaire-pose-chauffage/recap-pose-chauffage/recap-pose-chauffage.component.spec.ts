import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPoseChauffageComponent } from './recap-pose-chauffage.component';

describe('RecapPoseChauffageComponent', () => {
  let component: RecapPoseChauffageComponent;
  let fixture: ComponentFixture<RecapPoseChauffageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPoseChauffageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPoseChauffageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

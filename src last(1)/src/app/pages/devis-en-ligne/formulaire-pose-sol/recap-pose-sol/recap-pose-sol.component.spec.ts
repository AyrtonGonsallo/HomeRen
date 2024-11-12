import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPoseSolComponent } from './recap-pose-sol.component';

describe('RecapPoseSolComponent', () => {
  let component: RecapPoseSolComponent;
  let fixture: ComponentFixture<RecapPoseSolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPoseSolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPoseSolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

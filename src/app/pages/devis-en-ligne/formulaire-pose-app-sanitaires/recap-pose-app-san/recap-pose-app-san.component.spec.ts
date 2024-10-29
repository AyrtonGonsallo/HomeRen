import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPoseAppSanComponent } from './recap-pose-app-san.component';

describe('RecapPoseAppSanComponent', () => {
  let component: RecapPoseAppSanComponent;
  let fixture: ComponentFixture<RecapPoseAppSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPoseAppSanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPoseAppSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

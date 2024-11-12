import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPoseMursComponent } from './recap-pose-murs.component';

describe('RecapPoseMursComponent', () => {
  let component: RecapPoseMursComponent;
  let fixture: ComponentFixture<RecapPoseMursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPoseMursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPoseMursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPosePlomberieComponent } from './recap-pose-plomberie.component';

describe('RecapPosePlomberieComponent', () => {
  let component: RecapPosePlomberieComponent;
  let fixture: ComponentFixture<RecapPosePlomberieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPosePlomberieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPosePlomberieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

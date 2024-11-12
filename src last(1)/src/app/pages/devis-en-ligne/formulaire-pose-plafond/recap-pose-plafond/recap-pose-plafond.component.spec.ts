import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapPosePlafondComponent } from './recap-pose-plafond.component';

describe('RecapPosePlafondComponent', () => {
  let component: RecapPosePlafondComponent;
  let fixture: ComponentFixture<RecapPosePlafondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapPosePlafondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapPosePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

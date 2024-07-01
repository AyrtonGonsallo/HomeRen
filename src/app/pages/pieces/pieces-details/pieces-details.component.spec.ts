import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesDetailsComponent } from './pieces-details.component';

describe('PiecesDetailsComponent', () => {
  let component: PiecesDetailsComponent;
  let fixture: ComponentFixture<PiecesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiecesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiecesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

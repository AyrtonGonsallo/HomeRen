import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesListeComponent } from './pieces-liste.component';

describe('PiecesListeComponent', () => {
  let component: PiecesListeComponent;
  let fixture: ComponentFixture<PiecesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiecesListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiecesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

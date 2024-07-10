import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePosePlomberieComponent } from './formulaire-pose-plomberie.component';

describe('FormulairePosePlomberieComponent', () => {
  let component: FormulairePosePlomberieComponent;
  let fixture: ComponentFixture<FormulairePosePlomberieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePosePlomberieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePosePlomberieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePoseMursComponent } from './formulaire-pose-murs.component';

describe('FormulairePoseMursComponent', () => {
  let component: FormulairePoseMursComponent;
  let fixture: ComponentFixture<FormulairePoseMursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairePoseMursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairePoseMursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

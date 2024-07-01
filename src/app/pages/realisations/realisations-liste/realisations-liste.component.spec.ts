import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationsListeComponent } from './realisations-liste.component';

describe('RealisationsListeComponent', () => {
  let component: RealisationsListeComponent;
  let fixture: ComponentFixture<RealisationsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealisationsListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealisationsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

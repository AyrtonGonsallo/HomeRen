import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationsDetailsComponent } from './realisations-details.component';

describe('RealisationsDetailsComponent', () => {
  let component: RealisationsDetailsComponent;
  let fixture: ComponentFixture<RealisationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealisationsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealisationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

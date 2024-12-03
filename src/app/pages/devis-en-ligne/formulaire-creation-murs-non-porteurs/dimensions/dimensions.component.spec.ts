import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MursNonPorteursDimensionsComponent } from './dimensions.component';

describe('MursNonPorteursDimensionsComponent', () => {
  let component: MursNonPorteursDimensionsComponent;
  let fixture: ComponentFixture<MursNonPorteursDimensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MursNonPorteursDimensionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MursNonPorteursDimensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

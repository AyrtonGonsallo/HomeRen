import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapDemolitionCloisonsComponent } from './recap-demolition-cloisons.component';

describe('RecapDemolitionCloisonsComponent', () => {
  let component: RecapDemolitionCloisonsComponent;
  let fixture: ComponentFixture<RecapDemolitionCloisonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapDemolitionCloisonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapDemolitionCloisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

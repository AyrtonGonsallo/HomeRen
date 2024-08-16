import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapDeposeMursComponent } from './recap-depose-murs.component';

describe('RecapDeposeMursComponent', () => {
  let component: RecapDeposeMursComponent;
  let fixture: ComponentFixture<RecapDeposeMursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapDeposeMursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapDeposeMursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

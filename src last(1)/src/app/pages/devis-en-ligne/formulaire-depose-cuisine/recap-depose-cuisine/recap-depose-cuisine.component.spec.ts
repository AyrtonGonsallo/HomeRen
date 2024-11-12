import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapDeposeCuisineComponent } from './recap-depose-cuisine.component';

describe('RecapDeposeCuisineComponent', () => {
  let component: RecapDeposeCuisineComponent;
  let fixture: ComponentFixture<RecapDeposeCuisineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapDeposeCuisineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapDeposeCuisineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

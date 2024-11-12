import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapRenovationElectriqueComponent } from './recap-renovation-electrique.component';

describe('RecapRenovationElectriqueComponent', () => {
  let component: RecapRenovationElectriqueComponent;
  let fixture: ComponentFixture<RecapRenovationElectriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapRenovationElectriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapRenovationElectriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesDevisComponent } from './liste-des-devis.component';

describe('ListeDesDevisComponent', () => {
  let component: ListeDesDevisComponent;
  let fixture: ComponentFixture<ListeDesDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeDesDevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeDesDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

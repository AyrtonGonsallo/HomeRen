import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndProjectsComponent } from './end-projects.component';

describe('EndProjectsComponent', () => {
  let component: EndProjectsComponent;
  let fixture: ComponentFixture<EndProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

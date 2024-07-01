import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'nz-demo-checkbox-basic',
  template: ` <label nz-checkbox [(ngModel)]="checked">Checkbox</label> `
})
export class NzDemoCheckboxBasicComponent {
  checked = true;
}

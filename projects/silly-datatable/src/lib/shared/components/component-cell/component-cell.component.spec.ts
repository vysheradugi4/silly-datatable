import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCellComponent } from './component-cell.component';

describe('ComponentCellComponent', () => {
  let component: ComponentCellComponent;
  let fixture: ComponentFixture<ComponentCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentCellComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

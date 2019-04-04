import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellComponentComponent } from './cell-component.component';

describe('CellComponentComponent', () => {
  let component: CellComponentComponent;
  let fixture: ComponentFixture<CellComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

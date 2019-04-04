import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowClickedComponent } from './row-clicked.component';

describe('RowClickedComponent', () => {
  let component: RowClickedComponent;
  let fixture: ComponentFixture<RowClickedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowClickedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowClickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

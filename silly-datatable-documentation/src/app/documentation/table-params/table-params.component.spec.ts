import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParamsComponent } from './table-params.component';

describe('TableParamsComponent', () => {
  let component: TableParamsComponent;
  let fixture: ComponentFixture<TableParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

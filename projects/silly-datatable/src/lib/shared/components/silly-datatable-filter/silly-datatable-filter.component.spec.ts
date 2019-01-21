import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableFilterComponent } from './silly-datatable-filter.component';

describe('SillyDatatableFilterComponent', () => {
  let component: SillyDatatableFilterComponent;
  let fixture: ComponentFixture<SillyDatatableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SillyDatatableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

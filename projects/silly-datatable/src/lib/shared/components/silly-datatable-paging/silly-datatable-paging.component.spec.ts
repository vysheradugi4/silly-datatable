import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatablePagingComponent } from './silly-datatable-paging.component';

describe('SillyDatatablePagingComponent', () => {
  let component: SillyDatatablePagingComponent;
  let fixture: ComponentFixture<SillyDatatablePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SillyDatatablePagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

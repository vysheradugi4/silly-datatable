import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableFilterComponent } from './silly-datatable-filter.component';
import { FilterFieldComponent } from './../filter-field/filter-field.component';


describe('SillyDatatableFilterComponent', () => {
  let component: SillyDatatableFilterComponent;
  let fixture: ComponentFixture<SillyDatatableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        SillyDatatableFilterComponent,
        FilterFieldComponent,
      ],
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

  it('should emit filter values when apply filters', () => {

  });
});

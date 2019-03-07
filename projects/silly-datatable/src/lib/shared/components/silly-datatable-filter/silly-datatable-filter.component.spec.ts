import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableFilterComponent } from './silly-datatable-filter.component';
import { RequestService } from './../../../shared/services/request.service';
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
      providers: [
        RequestService,
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
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableFilterComponent } from './silly-datatable-filter.component';
import { FilterFieldComponent } from './../filter-field/filter-field.component';
import { FilterFormField } from './../../models/filter-form-field.model';
import { FilterSettings } from 'projects/silly-datatable/src/lib/shared/models/filter-settings.model';


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
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit filter values when apply filters', (done) => {
    const nameFormField = new FilterFormField();
    nameFormField.id = 'name';
    nameFormField.name = 'name';

    component.formFields = [nameFormField];
    component.ngOnInit();

    component.filtersUpdated$.subscribe((filterValues) => {
      expect(filterValues.name).toBe('test');
      done();
    });

    component.filterForm.setValue({ name: 'test' });
    component.applyFilters();
  });

  it('should emit filter values', (done) => {
    const nameFormField = new FilterFormField();
    nameFormField.id = 'name';
    nameFormField.name = 'name';

    component.formFields = [nameFormField];
    component.ngOnInit();

    component.valueChanges.subscribe((filterValues) => {
      expect(filterValues.name).toBe('test');
      done();
    });

    component.filterForm.setValue({ name: 'test' });
  });

  it('should be emit when call cancel', (done) => {
    component.settings = new FilterSettings();
    component.settings.cancelButtonClass = 'cancel';
    fixture.detectChanges();
    component.cancel.subscribe((value: null) => {
      expect(value).toBeNull();
      done();
    });

    const cancelButton = fixture.debugElement.nativeElement.querySelector('.cancel');
    cancelButton.click();
  });
});

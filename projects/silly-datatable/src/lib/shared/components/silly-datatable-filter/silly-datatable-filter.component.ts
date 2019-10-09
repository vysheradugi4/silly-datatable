import { Component, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { FilterFormField } from './../../models/filter-form-field.model';
import { FormsHelper } from './../../helpers/forms.helper';
import { FilterSettings } from './../../models/filter-settings.model';
import { Filter } from './../../models/filter.model';


@Component({
  selector: 'ngx-silly-datatable-filter',
  templateUrl: './silly-datatable-filter.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableFilterComponent implements OnDestroy {

  public values: Array<Filter>;
  public filterForm: FormGroup;

  @Input() public settings: FilterSettings;

  @Input() public set formFields(value: Array<FilterFormField>) {
    if (!value) {
      return;
    }

    this._formFields = value;
    this.initFormFieldsLogic();
  }

  @Output() public cancel: EventEmitter<null> = new EventEmitter();

  /**
   * Emits when form value changed.
   */
  @Output() public valueChanges: EventEmitter<any> = new EventEmitter<any>();

  private _formFields: Array<FilterFormField>;
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _filtersUpdated$: Subject<any> = new Subject<any>();

  constructor() { }


  public get formFields(): Array<FilterFormField> {
    return this._formFields;
  }


  public get filtersUpdated$(): Observable<any> {
    return this._filtersUpdated$.asObservable();
  }


  /**
   * Send request for get filtered source.
   */
  public applyFilters(): void {
    this._filtersUpdated$.next(this.values);
  }


  /**
   * Cancel button click handler.
   */
  public onCancel(): void {
    this.cancel.emit(null);
  }


  /**
   * Show changed field to angular.
   * @param index Index
   * @param item Changed parameter for detect.
   */
  public trackByFn(_, item: FilterFormField): string | any[] {
    return item.value + '-' + item.source;
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }


  private initFormFieldsLogic(): void {

    /**
     * Unsubscribed from last filterForm value changes subscription.
     */
    this._unsubscribe.next(true);


    this.filterForm = new FormGroup({
      filters: FormsHelper.toFormArray(this._formFields, 'value', 'disabled'),
    });


    /**
     * Check filter has form controls.
     */
    if (!this.filterForm) {
      return;
    }


    /**
     * Handle input value changes.
     */
    this.filterForm.controls.filters.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe(() => {
        this.values = (this.filterForm.controls.filters as FormArray).getRawValue()
          .map((value: any, index: number) => {
            return new Filter(
              this._formFields[index].id,
              this._formFields[index].filterType,
              value
            );
          });

        this.valueChanges.emit(this.values);
      });
  }
}

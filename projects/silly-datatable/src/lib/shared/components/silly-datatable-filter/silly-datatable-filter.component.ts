import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil, take, filter, skip } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

import { RequestService } from './../../services/request.service';
import { FilterFormField } from './../../models/filter-form-field.model';
import { FormsHelper } from './../../helpers/forms.helper';
import { FilterSettings } from './../../models/filter-settings.model';


@Component({
  selector: 'ngx-silly-datatable-filter',
  templateUrl: './silly-datatable-filter.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableFilterComponent implements OnInit, OnDestroy {

  public values: any;
  public filterForm: FormGroup;

  /**
   * For link filter with table.
   */
  @Input() public tableId = 'sole';

  @Input() public settings: FilterSettings;

  @Input() public formFields: Array<FilterFormField>;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  @Output() public cancel: EventEmitter<null> = new EventEmitter();

  /**
   * Emits when form value changed.
   */
  @Output() public valueChanges: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _requestService: RequestService
  ) { }


  ngOnInit() {
    this.filterForm = FormsHelper.toFormGroup(this.formFields, 'name', 'value', 'disabled');

    /**
     * Check filter has form controls.
     */
    if (!this.filterForm) {
      return;
    }

    /**
     * Handle input value changes. Skip first empty string.
     */
    const first$ = this.filterForm.valueChanges.pipe(
      take(1),
      filter((str: string) => str !== ''),
      takeUntil(this._unsubscribe)
    );

    const other$ = this.filterForm.valueChanges.pipe(
      skip(1),
      takeUntil(this._unsubscribe)
    );

    merge(first$, other$).pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe(() => {
        this.values = this.filterForm.getRawValue();
        this.valueChanges.emit(this.values);
      });
  }


  /**
   * Send request for get filtered source.
   */
  public applyFilters(): void {
    this._requestService.tableParams[this.tableId].filters = this.values;
    this._requestService.tableParams[this.tableId].pagination.page = 0;
    this._requestService.next(this.tableId);
  }


  /**
   * Cancel button click handler.
   */
  public onCancel(): void {
    this.cancel.emit();
  }


  /**
   * Show changed field to angular.
   * @param index Index
   * @param item Changed parameter for detect.
   */
  public trackByFn(index: number, item: FilterFormField): string | any[] {
    return item.value + '-' + item.source;
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

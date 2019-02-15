import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RequestService } from './../../services/request.service';
import { FilterFormField } from './../../models/filter-form-field.model';
import { FilterControlService } from './../../services/filter-control.service';
import { FilterSettings } from './../../models/filter-settings.model';
import { TableParams } from './../../models/table-params.model';


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
    private _requestService: RequestService,
    private _filterControlService: FilterControlService
  ) { }


  ngOnInit() {
    this.filterForm = this._filterControlService.toFormGroup(this.formFields);

    this.filterForm.valueChanges.pipe(
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

    this._requestService.call(this.tableId).pipe(
      take(1),
      takeUntil(this._unsubscribe)
    )
      .subscribe((tableParams: TableParams) => {
        tableParams.filters = this.values;
        tableParams.pagination.page = 0;
        tableParams.pagination.pages = null;
        this._requestService.next(this.tableId, tableParams);
      });
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

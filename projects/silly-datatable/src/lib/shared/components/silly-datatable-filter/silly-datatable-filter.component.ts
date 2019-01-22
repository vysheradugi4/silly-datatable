import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RequestService } from './../../services/request.service';
import { FilterFormField } from './../../models/filter-form-field.model';
import { FilterControlService } from './../../services/filter-control.service';
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

  @Input() public settings: FilterSettings;

  @Input() public formFields: Array<FilterFormField>;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  @Output() public cancel: EventEmitter<null> = new EventEmitter();

  constructor(
    private _requestService: RequestService,
    private _filterControlService: FilterControlService
  ) { }


  ngOnInit() {
    this.filterForm = this._filterControlService.toFormGroup(this.formFields);

    this.filterForm.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((values) => {
        this.values = values;
      });
  }


  /**
   * Send request for get filtered source.
   */
  public applyFilters(): void {
    this._requestService.tableParams.filters = this.values;
    this._requestService.tableParams.pagination.page = 0;
    delete this._requestService.tableParams.pagination.pages;
    this._requestService.next();
  }


  /**
   * Cancel button click handler.
   */
  public onCancel(): void {
    this.cancel.emit();
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

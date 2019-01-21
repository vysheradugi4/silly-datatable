import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RequestService } from './../../services/request.service';
import { FilterFormField } from './../../models/filter-form-field.model';
import { FilterControlService } from './../../services/filter-control.service';


@Component({
  selector: 'ngx-silly-datatable-filter',
  templateUrl: './silly-datatable-filter.component.html',
  styles: [],
})
export class SillyDatatableFilterComponent implements OnInit, OnDestroy {

  public values: any;
  public filterForm: FormGroup;

  @Input() public settings: Array<FilterFormField>;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _requestService: RequestService,
    private _filterControlService: FilterControlService
  ) { }


  ngOnInit() {
    this.filterForm = this._filterControlService.toFormGroup(this.settings);

    this.filterForm.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((values) => {
        console.log('zzzzzzzz', values);
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


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

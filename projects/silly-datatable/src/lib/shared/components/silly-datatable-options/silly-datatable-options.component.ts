import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import forIn from 'lodash/forIn';
import { OptionsService } from './../../services/options.service';
import { OptionsSettings } from './../../models/options-settings.model';
import { FormsHelper } from './../../helpers/forms.helper';
import { Column } from './../../models/column.model';
import { RequestService } from './../../services/request.service';
import { TableParams } from './../../models/table-params.model';


@Component({
  selector: 'ngx-silly-datatable-options',
  templateUrl: './silly-datatable-options.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableOptionsComponent implements OnInit, OnDestroy {

  /**
   * Id for link with table.
   */
  @Input() public tableId;

  @Input() public settings: OptionsSettings;

  public columns: FormGroup;
  public itemsPerPage: FormControl;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    public optionsService: OptionsService,
    private _requestService: RequestService
  ) { }

  ngOnInit() {

    /**
     * Table id required.
     */
    if (!this.tableId) {
      throw new Error('Table id required.');
    }


    /**
     * Exit without columns.
     */
    if (!this.optionsService.columns[this.tableId]) {
      throw new Error('Columns of table not defined.');
    }


    /**
     * Add show parameter in columns.
     */
    this.optionsService.columns[this.tableId].forEach((column: Column) => {
      if (column.show === undefined) {
        column.show = true;
      }
    });


    /**
     * Create form group with checkboxes for show hide columns.
     */
    this.columns = FormsHelper.toFormGroup(
      this.optionsService.columns[this.tableId], 'id', 'show'
    );


    /**
     * Set form control for select. For select number of items per page.
     */
    this.itemsPerPage = new FormControl(
      (this._requestService.tableParams[this.tableId] as TableParams).pagination.itemsPerPage
    );


    /**
     * Update columns status.
     */
    this.columns.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((values) => {

        /**
         * Toggle status of columns (show, hide);
         */
        forIn(values, (status: boolean, columnId: string) => {
          const column = (this.optionsService.columns[this.tableId] as Column[])
            .find((c, i, a) => c.id === columnId);

          column.show = status;
        });
        this.optionsService.storeState(this.tableId, values, 'shownColumns');
        this.optionsService.columnsChanged();
      });


    this.itemsPerPage.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((items) => {
        this._requestService.tableParams[this.tableId].pagination.itemsPerPage = items;
        this.optionsService.storeState(this.tableId, items, 'itemsPerPage');
        this._requestService.next(this.tableId);
      });
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

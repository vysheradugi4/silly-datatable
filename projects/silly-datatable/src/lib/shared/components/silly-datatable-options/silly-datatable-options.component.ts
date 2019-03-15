import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import forIn from 'lodash/forIn';
import { OptionsSettings } from './../../models/options-settings.model';
import { FormsHelper } from './../../helpers/forms.helper';
import { Column } from './../../models/column.model';
import { StoreService } from './../../services/store.service';


@Component({
  selector: 'ngx-silly-datatable-options',
  templateUrl: './silly-datatable-options.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableOptionsComponent implements OnInit, OnDestroy {

  @Input() public columns: Array<Column>;
  @Input() public itemsPerPageList: Array<number>;
  @Input() public settings: OptionsSettings;

  public columnsForm: FormGroup;
  public itemsPerPage: FormControl;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _columnsChanged: Subject<Array<Column>> = new Subject<Array<Column>>();

  constructor(
    private _storeService: StoreService
  ) { }

  ngOnInit() {

    /**
     * Exit without columns.
     */
    if (!this.columns) {
      throw new Error('Columns of table not defined.');
    }


    /**
     * Add show parameter in columns.
     */
    this.columns.forEach((column: Column) => {
      if (column.show === undefined) {
        column.show = true;
      }
    });


    /**
     * Create form group with checkboxes for show hide columns.
     */
    this.columnsForm = FormsHelper.toFormGroup(this.columns, 'id', 'show');


    /**
     * Set form control for select. For select number of items per page.
     */
    this.itemsPerPage = new FormControl(
      // (this._requestService.tableParams[this.tableId] as TableParams).pagination.itemsPerPage
    );


    /**
     * Update columns status.
     */
    this.columnsForm.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((values: any) => {

        /**
         * Toggle status of columns (show, hide);
         */
        forIn(values, (status: boolean, columnId: string) => {
          const column = (this.columns as Array<Column>)
            .find(c => c.id === columnId);

          column.show = status;
        });
        this._storeService.storeState(values, 'shownColumns');
      });


    this.itemsPerPage.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((items) => {
        // this._requestService.tableParams[this.tableId].pagination.itemsPerPage = items;
        this._storeService.storeState(items, 'itemsPerPage');
        // this._requestService.next(this.tableId);
      });
  }


  get columnsChanged(): Observable<Array<Column>> {
    return this._columnsChanged.asObservable();
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}
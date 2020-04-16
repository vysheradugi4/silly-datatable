import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { forIn } from 'lodash';
import { OptionsSettings } from './../../models/options-settings.model';
import { FormsHelper } from './../../helpers/forms.helper';
import { Column } from './../../models/column.model';


@Component({
  selector: 'ngx-silly-datatable-options',
  templateUrl: './silly-datatable-options.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableOptionsComponent implements OnDestroy {

  @Input() public set columns(value: Array<Column>) {
    if (!value) {
      return;
    }

    this._columns = value;
    this.initColumnsLogic();
  }

  @Input() public set itemsPerPageObjects(value: any) {
    if (!value) {
      return;
    }

    this._itemsPerPage = value.itemsPerPage;
    this._itemsPerPageList = value.itemsPerPageList;
    this.initItemsPerPageLogic();
  }

  @Input() public settings: OptionsSettings;

  public columnsForm: FormGroup;
  public itemsPerPageControl: FormControl;

  private _columns: Array<Column>;
  private _itemsPerPageList: Array<number>;
  private _itemsPerPage: number;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _columnsChanged$: Subject<Array<Column>> = new Subject<Array<Column>>();
  private _itemsPerPageChanged$: Subject<number> = new Subject<number>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }


  public get columnsChanged$(): Observable<Array<Column>> {
    return this._columnsChanged$.asObservable();
  }


  public get itemsPerPageChanged$(): Observable<number> {
    return this._itemsPerPageChanged$.asObservable();
  }


  public get columns(): Array<Column> | undefined {
    return this._columns;
  }


  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }


  public get itemsPerPageList(): Array<number> {
    return this._itemsPerPageList;
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }


  private initColumnsLogic(): void {

    /**
     * Add show parameter in columns.
     */
    this._columns.forEach((column: Column) => {
      if (column.show === undefined) {
        column.show = true;
      }
    });


    /**
     * Create form group with checkboxes for show hide columns.
     */
    this.columnsForm = FormsHelper.toFormGroup(this._columns, 'id', 'show');


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
          const column = (this._columns as Array<Column>)
            .find(c => c.id === columnId);

          column.show = !!status;
        });

        this._columnsChanged$.next(this._columns);
      });

    this._changeDetectorRef.markForCheck();
  }


  private initItemsPerPageLogic(): void {

    /**
     * ItemsPerPage section.
     */
    if (!this._itemsPerPage) {
      return;
    }

    /**
     * Set form control for select. For select number of items per page.
     */
    this.itemsPerPageControl = new FormControl(
      this._itemsPerPage
    );


    this.itemsPerPageControl.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((items) => {
        this._itemsPerPageChanged$.next(items);
      });

    this._changeDetectorRef.markForCheck();
  }
}

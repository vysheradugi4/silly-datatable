import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, combineLatest, Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { RequestService } from './../../services/request.service';
import { TableParams } from './../../models/table-params.model';


@Component({
  selector: 'ngx-silly-datatable-search',
  templateUrl: './silly-datatable-search.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableSearchComponent implements OnInit {

  public search: FormControl;


  /**
   * Disable control for example when loading process.
   */
  @Input() public set disabled(status: boolean) {
    this._disabled = status;

    if (this.search) {
      if (status) {
        this.search.disable();
        return;
      }

      this.search.enable();
    }
  }


  /**
   * For link with current table.
   */
  @Input() public tableId = 'sole';


  /**
   * For css customization of input form field.
   */
  @Input() public searchInputClass: string;


  /**
   * Html prefix before input form field (use for label for example).
   */
  @Input() public prefix: TemplateRef<any>;


  /**
   * Html suffix after input form field (use for error for example).
   */
  @Input() public suffix: TemplateRef<any>;


  /**
   * Input form field placeholder.
   */
  @Input() public placeholder: string;


  /**
   * For unsubscribe all subscriptions.
   */
  private _unsubscribe = new Subject<boolean>();
  private _disabled = false;

  constructor(
    private _requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.search = new FormControl({
      value: '',
      disabled: this._disabled,
    });

    /**
     * Handle input value changes.
     */
    const search$: Observable<string> = this.search.valueChanges.pipe(
      filter(str => !!str),
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this._unsubscribe)
    );

    /**
     * Change table params.
     */
    combineLatest(search$, this._requestService.call(this.tableId)).pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe(([search, tableParams]) => {

        tableParams.search = search;

        /**
         * For save original 'itemsPerPage' value.
         */
        tableParams.pagination.page = 0;
        tableParams.pagination.pages = null;

        this._requestService.next(this.tableId, tableParams);
      });
  }
}

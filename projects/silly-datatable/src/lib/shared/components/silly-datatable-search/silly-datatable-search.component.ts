import { TableParams } from './../../models/table-params.model';
import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, combineLatest, Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, takeUntil, switchMap, map, take } from 'rxjs/operators';

import { RequestService } from './../../services/request.service';


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
   * Set as true if need to use search string from external form control.
   */
  @Input() public usedExternalControl = false;


  /**
   * Search string from external form control.
   */
  @Input() public set dataFromExternalControl(search: string) {
    this.requestNewSearch(search);
  }


  /**
   * For unsubscribe all subscriptions.
   */
  private _unsubscribe = new Subject<boolean>();
  private _disabled = false;

  constructor(
    private _requestService: RequestService
  ) { }

  ngOnInit(): void {
    /**
     * Used external control for enter search string.
     */
    if (this.usedExternalControl) {
      return;
    }

    this.search = new FormControl({
      value: '',
      disabled: this._disabled,
    });

    /**
     * Handle input value changes.
     */
    this.search.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this._unsubscribe)
    )
      .subscribe((search: string) => {
        this.requestNewSearch(search);
      });
  }


  private requestNewSearch(search: string): void {
    this._requestService.tableParams[this.tableId].search = search;

    /**
     * For save original 'itemsPerPage' value.
     */
    this._requestService.tableParams[this.tableId].pagination.page = 0;
    this._requestService.tableParams[this.tableId].pagination.pages = null;

    this._requestService.next(this.tableId);
  }
}

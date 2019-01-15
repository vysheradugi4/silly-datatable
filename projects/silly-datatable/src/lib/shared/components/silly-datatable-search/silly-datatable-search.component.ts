import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { RequestService } from './../../services/request.service';


@Component({
  selector: 'ngx-silly-datatable-search',
  templateUrl: './silly-datatable-search.component.html',
  styles: [],
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
    this.search.valueChanges.pipe(
      filter(str => !!str),
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this._unsubscribe)
    )
      .subscribe((searchString: string) => {
        this._requestService.tableParams.search = searchString;
        this._requestService.next();
      });
  }
}

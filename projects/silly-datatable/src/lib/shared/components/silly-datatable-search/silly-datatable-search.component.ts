import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, merge, Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, takeUntil, take, skip } from 'rxjs/operators';


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
        this.search.disable({ emitEvent: false });
        return;
      }

      this.search.enable({ emitEvent: false });
    }
  }


  @Input() public inputId: string;


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
    this._searchRequest.next(search);
  }


  /**
   * For unsubscribe all subscriptions.
   */
  private _unsubscribe = new Subject<boolean>();
  private _disabled = false;
  private _searchRequest: Subject<string> = new Subject<string>();

  constructor() { }

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
     * Handle input value changes. Skip first empty string.
     */
    const first$ = this.search.valueChanges.pipe(
      take(1),
      filter((str: string) => str !== ''),
      takeUntil(this._unsubscribe)
    );

    const other$ = this.search.valueChanges.pipe(
      skip(1),
      takeUntil(this._unsubscribe)
    );

    merge(first$, other$).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this._unsubscribe)
    )
      .subscribe((search: string) => {
        this._searchRequest.next(search);
      });
  }

  public get searchRequest(): Observable<string> {
    return this._searchRequest.asObservable();
  }
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { SettingsService } from './../../services/settings.service';


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
  @Input() public disable = false;

  @Output() public searchRequest: EventEmitter<string> = new EventEmitter();

  /**
   * For unsubscribe all subscriptions.
   */
  private _unsubscribe = new Subject<boolean>();

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.search = new FormControl('');

    /**
     * Handle input value changes.
     */
    this.search.valueChanges.pipe(
      filter(str => !!str),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this._unsubscribe)
    )
      .subscribe((searchString: string) => {
        console.log('zzzzzzzzzzzzzz', searchString);
        this.searchRequest.emit(searchString);
      });
  }
}

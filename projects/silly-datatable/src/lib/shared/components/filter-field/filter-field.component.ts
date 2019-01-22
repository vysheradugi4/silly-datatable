import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { FilterFormField } from './../../models/filter-form-field.model';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'ngx-filter-field',
  templateUrl: './filter-field.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FilterFieldComponent),
    },
  ],
})
export class FilterFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {

  public disabled: boolean;
  public touched: Function;
  public change: Function;
  public formControl: FormControl;

  /**
   * Context for custom input.
   */
  public context: any;

  @Input() public filterFieldSettings: FilterFormField;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.touched = () => { };
    this.change = (value: string | Array<any>) => value;

    this.formControl = new FormControl();

    this.formControl.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((value) => {
        this.change(value);
      });


    /**
     * Setup context.
     */
    if (this.filterFieldSettings.customInput) {
      // Copy all fields except customInput ref.
      const {customInput, ...settings} = this.filterFieldSettings;

      this.context = {
        filterFieldSettings: settings,
        formControl: this.formControl,
        touched: this.touched,
      };
    }
  }


  writeValue(value: string | Array<any>): void {
    this.formControl.setValue(value || '');
  }


  registerOnChange(fn: any): void {
    this.change = fn;
  }


  registerOnTouched(fn: any): void {
    this.touched = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
      return;
    }

    this.formControl.enable();
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

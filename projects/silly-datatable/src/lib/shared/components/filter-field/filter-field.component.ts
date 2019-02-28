import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
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
  public formControl: FormControl = new FormControl();
  public filterFieldSettings: FilterFormField = new FilterFormField;

  /**
   * Context for custom input.
   */
  public context: any;

  @Input() public set filterField(settings: FilterFormField) {
    this.filterFieldSettings = settings;

    if (this.formControl) {
      this.formControl.setValue(this.filterFieldSettings.value);
    }
  }

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.touched = () => { };
    this.change = (value: string | Array<any>) => value;

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
      const { customInput, ...settings } = this.filterFieldSettings;

      this.context = {
        filterFieldSettings: settings,
        formControl: this.formControl,
        touched: this.touched,
      };
    }
  }


  writeValue(value: any): void {
    this.formControl.setValue(value);
  }


  registerOnChange(fn: any): void {
    this.change = fn;
  }


  registerOnTouched(fn: any): void {
    this.touched = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
      return;
    }

    this.formControl.enable({ emitEvent: false });
  }


  /**
   * Compare values in select.
   * @param item1 Select's value object.
   * @param item2 Select's value object.
   * @returns True if same.
   */
  public compareFn(item1, item2): boolean {
    if (!this.filterFieldSettings) {
      return false;
    }

    return item1 && item2 ?
      item1[this.filterFieldSettings.valueKeyName] === item2[this.filterFieldSettings.valueKeyName] :
      item1 === item2;
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

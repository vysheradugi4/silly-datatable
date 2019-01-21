import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { FilterFormField } from './../../models/filter-form-field.model';


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
export class FilterFieldComponent implements OnInit, ControlValueAccessor {

  public disabled: boolean;
  public touched: Function;
  public change: Function;
  public formControl: FormControl;

  @Input() public filterFieldSettings: FilterFormField;

  constructor() { }

  ngOnInit() {
    this.touched = () => { };
    this.change = (value: string | Array<any>) => value;

    this.formControl = new FormControl();

    this.formControl.valueChanges
      .subscribe((value) => {
        this.change(value);
      });
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
}

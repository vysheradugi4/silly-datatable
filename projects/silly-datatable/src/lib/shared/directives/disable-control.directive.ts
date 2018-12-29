import { NgControl } from '@angular/forms';
import { Directive, Input, Optional } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[disableControl]',
})
export class DisableControlDirective {

  @Input() set disableControl( condition: boolean ) {
    const action = condition ? 'disable' : 'enable';
    this._ngControl.control[action]();
  }

  constructor( @Optional() private _ngControl: NgControl ) {
  }
}

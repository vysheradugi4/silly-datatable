import { NgControl } from '@angular/forms';
import { Directive, Input, Optional, OnChanges, SimpleChange } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[disableControl]',
})
export class DisableControlDirective implements OnChanges {

  @Input() public disableControl: boolean;

  constructor(
    @Optional() private _ngControl: NgControl
  ) { }


  ngOnChanges(changes): void {
    if (changes['disableControl']) {
      const action = this.disableControl ? 'disable' : 'enable';
      this._ngControl.control[action]({ emitEvent: false });
    }
  }
}

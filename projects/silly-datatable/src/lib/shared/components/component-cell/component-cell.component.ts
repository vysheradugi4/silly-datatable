import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ComponentFactoryResolver,
  Output,
  EventEmitter
} from '@angular/core';
import { ComponentCell } from './../../models/component-cell.model';


@Component({
  selector: 'ngx-component-cell',
  templateUrl: './component-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentCellComponent implements OnInit {

  @Input() public row: any;
  @Input() public columnId: string;
  @Input() public component: any;

  @Output() public loaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() public componentCellEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    if (!this.component) {
      return;
    }

    const factory = this._componentFactoryResolver.resolveComponentFactory(this.component);
    const componentRef = this._viewContainerRef.createComponent(factory);
    const component = componentRef.instance as ComponentCell;
    component.row = this.row;
    component.columnId = this.columnId;


    /**
     * Pass created instance for prepare cell function.
     */
    this.loaded.emit(component);


    /**
     * For event in cell component.
     */
    component.componentCellEvent = this.componentCellEvent;
  }
}

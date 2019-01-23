import { Component, OnInit, Input, ChangeDetectionStrategy, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';


@Component({
  selector: 'ngx-component-cell',
  templateUrl: './component-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentCellComponent implements OnInit {

  @Input() public row: any;
  @Input() public component: any;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const factory = this._componentFactoryResolver.resolveComponentFactory(this.component);
    const componentRef: any = this._viewContainerRef.createComponent(factory);
    componentRef.instance.row = this.row;
  }
}
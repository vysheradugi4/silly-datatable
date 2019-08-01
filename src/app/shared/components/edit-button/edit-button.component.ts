import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styles: [],
})
export class EditButtonComponent implements OnInit {

  public row: any;
  public disabled = false;

  public componentCellEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.componentCellEvent.next('Some data');
  }
}

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss'],
})
export class TableOptionsComponent implements OnInit {

  @ViewChild('tableOptions') public tableOptions: any;

  @Output() public options = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.options.emit(this.tableOptions);
  }
}

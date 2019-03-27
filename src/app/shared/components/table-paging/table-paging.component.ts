import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-paging',
  templateUrl: './table-paging.component.html',
  styleUrls: ['./table-paging.component.scss'],
})
export class TablePagingComponent implements OnInit {

  @ViewChild('tablePaging') public tablePaging: any;

  @Output() public paging = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.paging.emit(this.tablePaging);
  }

}

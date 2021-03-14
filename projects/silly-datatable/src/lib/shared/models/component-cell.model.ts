import { EventEmitter } from '@angular/core';


export interface ComponentCell {
  row: any;
  columnId: string;
  params: any;
  componentCellEvent: EventEmitter<any>;
}

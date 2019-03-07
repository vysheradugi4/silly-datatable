import { Subject } from 'rxjs';


export class OptionsMockService {
  public columns = {};
  public itemsPerPage = {};

  public columnsChanged$: Subject<null> = new Subject<null>();

  constructor() {
    this.columns['sole'] = [];
  }

  public clearColumns() { }

  public clearItemsPerPageInfo() { }
}

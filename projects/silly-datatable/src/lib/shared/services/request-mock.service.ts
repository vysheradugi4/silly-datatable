import { TableParams } from './../../shared/models/table-params.model';
import { Pagination } from './../../shared/models/pagination.model';

export class RequestMockService {
  public tableParams = {};

  constructor() {
    this.tableParams['sole'] = new TableParams();
    (this.tableParams['sole'] as TableParams).pagination = new Pagination();
  }
}

import { Pagination } from './pagination.model';
import { Sort } from './sort.model';


export class TableParams {
  public search: String;
  public sort: Sort;
  public pagination: Pagination;
}

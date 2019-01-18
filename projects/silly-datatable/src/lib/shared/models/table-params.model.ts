import { Pagination } from './pagination.model';
import { Sort } from './sort.model';


export class TableParams {
  public search?: string;
  public sort?: Sort;
  public pagination: Pagination;
  public filters?: any;
}

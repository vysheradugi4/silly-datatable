import { Pagination } from './pagination.model';
import { Sort } from './sort.model';


export class TableParams {
  public search?: string;
  public sort?: Sort;
  public pagination: Pagination;
  public filters?: any;

  /**
   * The dataset for show in the table.
   */
  public source: Array<any>;
}

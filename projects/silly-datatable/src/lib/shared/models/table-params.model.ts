import { Pagination } from './pagination.model';
import { Sort } from './sort.model';
import { Filter } from './filter.model';


export class TableParams {
  public searchText?: string;
  public sort?: Sort;
  public filters?: Array<Filter>;
  public pagination: Pagination;

  /**
   * The dataset for show in the table.
   */
  public source?: Array<any>;
}

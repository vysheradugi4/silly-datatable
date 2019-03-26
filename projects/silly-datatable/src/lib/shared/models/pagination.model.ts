export class Pagination {

  /**
   * Current page.
   */
  public pageNumber: number;


  /**
   * Number of pages.
   */
  public pageCount?: number;


  /**
   * Number of elements on the page.
   */
  public itemsPerPage: number;

  /**
   * List of possible counts of items per page.
   */
  public itemsPerPageList?: Array<number>;
}

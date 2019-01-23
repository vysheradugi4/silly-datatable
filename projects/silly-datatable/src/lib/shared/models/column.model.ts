export class Column {
  /**
   * Column id for link with source.
   */
  public id: string;


  /**
   * Name of column. Text for header and sorting header of table.
   */
  public title?: string;


  /**
   * Custom class for header of column.
   */
  public headerClass?: string;


  /**
   * Custom class for cells of current column.
   */
  public cellClass?: string;


  /**
   * Resolver for sorting current column.
   */
  public sortable?: boolean;


  /**
   * Customization function for prepare data before showed.
   */
  public prepareCellFunction?: Function;


  /**
   * Custom component as content of cell.
   */
  public componentCell?: any;
}

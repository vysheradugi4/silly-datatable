import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SillyDatatableComponent } from './silly-datatable.component';
import { ComponentsModule } from './shared/components/components.module';
import { TableParams } from './shared/models/table-params.model';
import { PipesModule } from './shared/pipes/pipes.module';
import { SillyDatatableSearchComponent } from './shared/components/silly-datatable-search/silly-datatable-search.component';
import { Pagination } from 'projects/silly-datatable/src/lib/shared/models/pagination.model';
import { SillyDatatableFilterComponent } from './shared/components/silly-datatable-filter/silly-datatable-filter.component';
import { FilterFormField } from './shared/models/filter-form-field.model';
import { SillyDatatablePagingComponent } from './shared/components/silly-datatable-paging/silly-datatable-paging.component';
import { StoreService } from './shared/services/store.service';
import { Column } from './shared/models/column.model';
import { SillyDatatableOptionsComponent } from './shared/components/silly-datatable-options/silly-datatable-options.component';


describe('SillyDatatableComponent', () => {
  let component: SillyDatatableComponent;
  let fixture: ComponentFixture<SillyDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        PipesModule,
      ],
      declarations: [SillyDatatableComponent],
      providers: [
        StoreService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableComponent);
    component = fixture.componentInstance;
    component.id = 'sole';
    const tableParams = {
      pagination: new Pagination(),
    } as TableParams;
    (component as SillyDatatableComponent).tableParams = tableParams;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  /**
   * ngOnInit
   */

  it('onInit should return throw when id not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatableComponent);
    component = fixture2.componentInstance;
    expect(() => fixture2.detectChanges()).toThrow(new Error('Table id required.'));
  });

  it('onInit should return throw when tableParams not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatableComponent);
    component = fixture2.componentInstance;
    component.id = 'sole';
    expect(() => fixture2.detectChanges()).toThrow(new Error('Table params required.'));
  });


  /**
   * Sort.
   */

  it('sortEnable should add sort param with columnName `name` in tableParams object', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    expect(tableParams.sort.columnName).toBe('name');
  });

  it('sortEnable should add sort param with isDesc param equal false in tableParams object', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    expect(tableParams.sort.isDesc).toBeFalsy();
  });

  it('sortEnable should add sort param with isDesc param equal true in tableParams object after second click', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    expect(tableParams.sort.isDesc).toBeTruthy();
  });

  it('sortEnable should add sort param with isDesc param equal false in tableParams object after third click', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    component.sortEnable('name');
    expect(tableParams.sort.isDesc).toBeFalsy();
  });

  it('sortEnable should change column name to `age`', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('age');
    expect(tableParams.sort.columnName).toBe('age');
  });

  it('sortEnable should change isDesc to false when change name to `age`', () => {
    let tableParams: TableParams;

    component.request.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    component.sortEnable('age');
    expect(tableParams.sort.isDesc).toBeFalsy();
  });


  /**
   * Click by row.
   */

  it('should call rowClicked', (done) => {
    component.rowClicked.subscribe((clickedRow) => {
      expect(clickedRow).toEqual({ id: 1 });
      done();
    });

    component.clicked({ id: 1 });
  });

  it('should return undefined when row is not defined', () => {
    expect(component.clicked(undefined)).toBeUndefined();
  });


  it('should not emit rowClicked if double click', fakeAsync(() => {
    let row: any;

    component.rowClicked.subscribe((clickedRow) => {
      row = clickedRow;
    });

    component.clicked({ id: 1 });
    component.doubleClicked({ id: 1 });

    tick(500);

    fixture.whenStable().then(() => {
      expect(row).toBeUndefined();
    });
  }));

  it('should emit rowDoubleClicked event emitter', () => {
    let row: any;

    component.rowDoubleClicked.subscribe((clickedRow) => {
      row = clickedRow;
    });

    component.doubleClicked({ id: 1 });
    expect(row).toEqual({ id: 1 });
  });

  /**
   * Custom component cell event emit.
   */

  it('should emit componentCellEvent', () => {
    let row: any;

    component.componentCellEvent.subscribe((event) => {
      row = event;
    });
    component.onComponentCellEvent({ edit: 5 });
    expect(row).toEqual({ edit: 5 });
  });

  /**
   * Search component.
   */
  it('should request new data with search string in table params', (done) => {
    component.searchComponent = new SillyDatatableSearchComponent();
    component.searchComponent.ngOnInit();
    component.ngOnInit();

    component.request.subscribe((tableParams: TableParams) => {
      expect(tableParams.searchText).toBe('search string');
      done();
    });

    component.searchComponent.search.setValue('search string');
  });

  /**
   * Filter component.
   */
  it('shout request new data with filter value in table params', (done) => {
    component.filterComponent = new SillyDatatableFilterComponent();
    component.filterComponent.formFields = [
      { id: 'name', name: 'name' } as FilterFormField,
    ];
    (component.filterComponent as any).initFormFieldsLogic();
    component.ngOnInit();
    component.request.subscribe((tableParams: TableParams) => {
      expect(tableParams.filters.name).toBe('test');
      done();
    });
    component.filterComponent.filterForm.setValue({ name: 'test' });
    component.filterComponent.applyFilters();
  });

  /**
   * Pagination component.
   */
  it('should request new data for new page', (done) => {
    component.tableParams = {
      pagination: {
        pageNumber: 0,
        pageCount: 10,
        itemsPerPage: 10,
      },
    } as any;

    component.pagingComponent = new SillyDatatablePagingComponent();

    component.ngOnInit();

    component.request.subscribe((tableParams: TableParams) => {
      expect(tableParams.pagination.pageNumber).toBe(1);
      done();
    });

    (component as any)._pagingComponent.pageRequest(1);
  });

  /**
   * Set itemsPerPage.
   */
  it('should set itemsPerPage as 1 (first element of itemsPerPageList)', () => {

    const settings = {
      itemsPerPageList: [1, 3, 5],
    } as any;

    component.settings = settings;
    component.ngOnInit();
    expect(component.tableParams.pagination.itemsPerPage).toBe(1);
  });

  it('should set value in option itemsPerPage same in stored in localStorage', () => {
    const service: StoreService = TestBed.get(StoreService);
    service.storeState('itemsPerPage', 'Object_sole', 3);

    component.columns = [
      { id: 'id', name: 'name' } as Column,
    ];

    component.settings = {
      itemsPerPageList: [1, 3, 5],
    };

    component.tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 1,
      },
    } as any;

    component.ngOnInit();

    const cdRefMock = {
      markForCheck: () => null,
    } as any;

    component.optionsComponent = new SillyDatatableOptionsComponent(cdRefMock);

    ((component as any)._optionsComponent as any).initItemsPerPageLogic();

    expect((component as any)._optionsComponent.itemsPerPageControl.value).toBe(3);
    localStorage.clear();
  });
});

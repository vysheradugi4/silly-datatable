import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatablePagingComponent } from './silly-datatable-paging.component';
import { PipesModule } from './../../pipes/pipes.module';
import { TableParams } from './../../models/table-params.model';
import { Pagination } from './../../../shared/models/pagination.model';


describe('SillyDatatablePagingComponent', () => {
  let component: SillyDatatablePagingComponent;
  let fixture: ComponentFixture<SillyDatatablePagingComponent>;

  const tableParams = new TableParams();
  tableParams.pagination = new Pagination();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipesModule,
      ],
      declarations: [SillyDatatablePagingComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatablePagingComponent);
    component = fixture.componentInstance;
    component.pagination = new Pagination();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  /**
   * ngOnInit.
   */

  it('onInit should return throw when pagination not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatablePagingComponent);
    component = fixture2.componentInstance;
    expect(() => fixture2.detectChanges()).toThrow(new Error('Pagination data required.'));
  });

  it('should emit pageUpdated when call pageRequest method', (done) => {
    component.pageUpdated.subscribe((page: number) => {
      expect(page).toBe(4);
      done();
    });

    component.pageRequest(4);
  });

  /**
   * Current page.
   */
  it('should equal pagination page and current page', () => {
    component.pagination.page = 1;
    expect(component.pagination.page).toBe(component.currentPage);
  });

  /**
   * Number of pages.
   */
  it('should equal pagination pages and numberOfPages', () => {
    component.pagination.pages = 10;
    expect(component.pagination.pages).toBe(component.numberOfPages);
  });

  /**
   * Start of slice.
   */
  it('should return 0 for current page < 1', () => {
    component.pagination.page = 0;
    expect(component.start).toBe(0);
  });

  it('should return 0 for undefined pages', () => {
    component.pagination.page = 1;
    expect(component.start).toBe(0);
  });

  it('should return 0 for current page = 1', () => {
    component.pagination.page = 1;
    component.pagination.pages = 20;
    expect(component.start).toBe(0);
  });

  it('should return 0 for current page = 2', () => {
    component.pagination.page = 2;
    component.pagination.pages = 20;
    expect(component.start).toBe(0);
  });

  it('should return 1 for current page = 3', () => {
    component.pagination.page = 3;
    component.pagination.pages = 20;
    expect(component.start).toBe(1);
  });

  it('should return 5 for current page = 7, end of pagination', () => {
    component.pagination.page = 7;
    component.pagination.pages = 10;
    expect(component.start).toBe(5);
  });

  it('should return 5 for current page = 8, end of pagination', () => {
    component.pagination.page = 8;
    component.pagination.pages = 10;
    expect(component.start).toBe(5);
  });

  it('should return 5 for current page = 9, end of pagination', () => {
    component.pagination.page = 9;
    component.pagination.pages = 10;
    expect(component.start).toBe(5);
  });

  /**
   * End of slice.
   */
  it('should return 5 for current page = 0', () => {
    component.pagination.page = 0;
    component.pagination.pages = 10;
    expect(component.end).toBe(5);
  });

  it('should return 5 for current page = 1', () => {
    component.pagination.page = 1;
    component.pagination.pages = 10;
    expect(component.end).toBe(5);
  });

  it('should return 5 for current page = 2', () => {
    component.pagination.page = 2;
    component.pagination.pages = 10;
    expect(component.end).toBe(5);
  });

  it('should return 6 for current page = 3', () => {
    component.pagination.page = 3;
    component.pagination.pages = 10;
    expect(component.end).toBe(6);
  });

  it('should return 7 for current page = 4', () => {
    component.pagination.page = 4;
    component.pagination.pages = 10;
    expect(component.end).toBe(7);
  });
});

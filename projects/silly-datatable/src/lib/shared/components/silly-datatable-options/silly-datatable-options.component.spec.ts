import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableOptionsComponent } from './silly-datatable-options.component';
import { StoreService } from './../../services/store.service';
import { Column } from './../../models/column.model';


describe('SillyDatatableOptionsComponent', () => {
  let component: SillyDatatableOptionsComponent;
  let fixture: ComponentFixture<SillyDatatableOptionsComponent>;
  let columns = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [SillyDatatableOptionsComponent],
      providers: [
        StoreService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableOptionsComponent);
    component = fixture.componentInstance;
    component.columns = columns;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should add "show" property to columns object if this property is absent', () => {
    columns = [
      { id: 'id1' } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    (component as any).initColumnsLogic();
    expect(component.columns[0].show).toBeTruthy();
  });

  it('should not change "show" property if defined', () => {
    columns = [
      { id: 'id1', show: false } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    (component as any).initColumnsLogic();
    expect(component.columns[0].show).toBeFalsy();
  });

  it('should not change "show" property if defined', () => {
    columns = [
      { id: 'id1', show: true } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    (component as any).initColumnsLogic();
    expect(component.columns[0].show).toBeTruthy();
  });

  it('should create form group from columns object', () => {
    columns = [
      { id: 'id1', show: true } as Column,
      { id: 'id2' } as Column,
    ];
    component.columns = columns;
    (component as any).initColumnsLogic();
    expect(component.columnsForm).toBeDefined();
  });

  it('should not create form group for setup itemsPerPage parameter', () => {
    (component as any).initItemsPerPageLogic();
    expect(component.itemsPerPageControl).toBeUndefined();
  });

  it('should create form group for setup itemsPerPage parameter', () => {
    component.itemsPerPageObjects = {
      itemsPerPage: 10,
    };
    (component as any).initItemsPerPageLogic();
    expect(component.itemsPerPageControl).toBeDefined();
  });

  /**
   * Columns state changed functional.
   */
  it('should emit new columns object when changed columns state', (done) => {
    component.columns = [
      { id: 'id1', show: true } as Column,
    ];
    (component as any).initColumnsLogic();
    component.columnsChanged$.subscribe((changedColumns: Array<Column>) => {
      expect(changedColumns[0].show).toBeFalsy();
      done();
    });

    component.columnsForm.setValue({ id1: false });
  });

  /**
   * ItemsPerPage changed functional.
   */
  it('should emit new itemsPerPage value', (done) => {
    component.itemsPerPageObjects = {
      itemsPerPage: 10,
      itemsPerPageList: [10, 30, 50],
    };

    (component as any).initItemsPerPageLogic();
    component.itemsPerPageChanged$.subscribe((itemsPerPage) => {
      expect(itemsPerPage).toBe(30);
      done();
    });

    component.itemsPerPageControl.setValue(30);
  });
});

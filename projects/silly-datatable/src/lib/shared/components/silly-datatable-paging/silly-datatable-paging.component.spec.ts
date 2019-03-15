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
    component.tableParams = tableParams;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

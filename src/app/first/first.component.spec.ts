import { TablePagingComponent } from './../shared/components/table-paging/table-paging.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { FirstComponent } from './first.component';
import { SillyDatatableModule } from 'projects/silly-datatable/src/public_api';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';
import { TableOptionsComponent } from './../shared/components/table-options/table-options.component';
import { Pagination } from 'projects/silly-datatable/src/lib/shared/models/pagination.model';
import { TableParams } from './../../../projects/silly-datatable/src/lib/shared/models/table-params.model';


describe('FirstComponent', () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SillyDatatableModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FirstComponent,
        EditButtonComponent,
        TableOptionsComponent,
        TablePagingComponent,
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [EditButtonComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstComponent);
    component = fixture.componentInstance;
    component.tableParams = new TableParams();
    component.tableParams.pagination = new Pagination();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

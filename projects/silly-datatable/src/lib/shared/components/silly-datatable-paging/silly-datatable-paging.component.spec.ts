import { RequestMockService } from './../../services/request-mock.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatablePagingComponent } from './silly-datatable-paging.component';
import { PipesModule } from './../../pipes/pipes.module';
import { RequestService } from './../../../shared/services/request.service';

describe('SillyDatatablePagingComponent', () => {
  let component: SillyDatatablePagingComponent;
  let fixture: ComponentFixture<SillyDatatablePagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PipesModule,
      ],
      declarations: [SillyDatatablePagingComponent],
      providers: [
        {
          provide: RequestService,
          useClass: RequestMockService,
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

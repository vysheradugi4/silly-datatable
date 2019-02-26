import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableComponent } from './silly-datatable.component';
import { ComponentsModule } from './shared/components/components.module';
import { RequestService } from './shared/services/request.service';
import { TableParams } from './shared/models/table-params.model';


describe('SillyDatatableComponent', () => {
  let component: SillyDatatableComponent;
  let fixture: ComponentFixture<SillyDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
      ],
      declarations: [ SillyDatatableComponent ],
      providers: [
        RequestService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableComponent);
    component = fixture.componentInstance;
    (component as SillyDatatableComponent).tableParams = new TableParams();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

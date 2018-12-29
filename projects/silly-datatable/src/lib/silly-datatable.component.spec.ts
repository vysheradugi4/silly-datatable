import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableComponent } from './silly-datatable.component';
import { SettingsService } from './shared/services/settings.service';

describe('SillyDatatableComponent', () => {
  let component: SillyDatatableComponent;
  let fixture: ComponentFixture<SillyDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SillyDatatableComponent ],
      providers: [
        SettingsService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

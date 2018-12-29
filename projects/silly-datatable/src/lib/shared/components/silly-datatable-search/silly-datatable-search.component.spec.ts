import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SillyDatatableSearchComponent } from './silly-datatable-search.component';
import { SettingsService } from './../../services/settings.service';

describe('SillyDatatableSearchComponent', () => {
  let component: SillyDatatableSearchComponent;
  let fixture: ComponentFixture<SillyDatatableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SillyDatatableSearchComponent ],
      providers: [
        SettingsService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

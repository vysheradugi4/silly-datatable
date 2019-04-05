import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSearchSettingsComponent } from './quick-search-settings.component';

describe('QuickSearchSettingsComponent', () => {
  let component: QuickSearchSettingsComponent;
  let fixture: ComponentFixture<QuickSearchSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSearchSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSearchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

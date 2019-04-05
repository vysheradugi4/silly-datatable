import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSettingsComponent } from './options-settings.component';

describe('OptionsSettingsComponent', () => {
  let component: OptionsSettingsComponent;
  let fixture: ComponentFixture<OptionsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

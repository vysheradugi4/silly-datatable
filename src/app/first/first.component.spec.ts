import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstComponent } from './first.component';
import { SillyDatatableModule } from 'projects/silly-datatable/src/public_api';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

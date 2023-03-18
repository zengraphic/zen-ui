import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCheckboxComponent } from './input-checkbox.component';

describe('InputCheckboxComponent', () => {
  let component: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
      control = new FormControl();
      viewToModelUpdate() {}
  }};
    await TestBed.configureTestingModule({
      declarations: [ InputCheckboxComponent ],
      imports: [FormsModule,ReactiveFormsModule]
    })
    .overrideComponent(InputCheckboxComponent,{
      add: {
        providers: [NG_CONTROL_PROVIDER]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(InputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have true value', () => {
    
    const previewTrigger = fixture.debugElement.query(By.css('.zen-form-checkbox'));
    previewTrigger.nativeElement.focus();
    previewTrigger.nativeElement.click();
    fixture.detectChanges();
    expect(component.value).toBeTrue();
  });
});

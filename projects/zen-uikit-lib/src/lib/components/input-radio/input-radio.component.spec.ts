import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, NgControl, FormControl } from '@angular/forms';

import { InputRadioComponent } from './input-radio.component';

describe('InputRadioComponent', () => {
  let component: InputRadioComponent;
  let fixture: ComponentFixture<InputRadioComponent>;

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
      control = new FormControl();
      viewToModelUpdate() {}
  }};
    await TestBed.configureTestingModule({
      declarations: [ InputRadioComponent ],
      imports: [FormsModule,ReactiveFormsModule]
    })
    .overrideComponent(InputRadioComponent,{
      add: {
        providers: [NG_CONTROL_PROVIDER]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have true value', () => {
    
    const previewTrigger = fixture.debugElement.query(By.css('.zen-input-radio__input'));
    previewTrigger.nativeElement.focus();
    component.writeValue(true);
    fixture.detectChanges();
    expect(component.innerValue).toBeTrue();
  });
});

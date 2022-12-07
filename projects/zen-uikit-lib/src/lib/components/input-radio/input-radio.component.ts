import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, Injector, forwardRef, AfterViewInit, Input } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  selector: 'zen-input-radio',
  templateUrl: './input-radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputRadioComponent),
    multi: true
  }]
})
export class InputRadioComponent extends InputBaseComponent implements ControlValueAccessor, AfterViewInit {
  @Input() groupName: string;
  @Input() value: any;
  @Input() isHTML: boolean;
  constructor(injector: Injector) {
    super(injector);
  }
  
  onTouched: (val: any) => void;
  onChange: (val: any) => void;
  innerValue: string;

  get isChecked(): boolean {
    return this.modelValue === this.value;
  }

  get modelValue(): any {
    return this.innerValue;
  }

  set modelValue(obj: any) {
    this.innerValue = obj;
    this.onChange(obj);
    this.onTouched(obj);
  }

  writeValue(obj: any) {
    this.innerValue = obj;
    this.ref?.markForCheck();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}

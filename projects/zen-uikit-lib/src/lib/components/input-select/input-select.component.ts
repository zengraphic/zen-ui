import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  forwardRef,
  Injector,
  ViewChild,
  Input,
} from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'zen-input-select',
  templateUrl: './input-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent
  extends InputBaseComponent
  implements ControlValueAccessor
{
  @ViewChild(NgSelectComponent, { static: true })
  ngSelectComponentRef: NgSelectComponent;

  @Input() bindLabel = 'name';
  @Input() bindValue = 'id';
  @Input() isOpen: boolean;
  @Input() items: any[];
  @Input() placeholder = '';
  @Input() isMultiSelect: boolean = false;
  @Input() selectionLimitt: number;
  constructor(injector: Injector) {
    super(injector);
  }
  get isFilled(): boolean {
    return Boolean(this.formControl && this.formControl.value);
  }
  writeValue(obj: any): void {
    this.ngSelectComponentRef.writeValue(obj);
  }
  registerOnChange(fn: any): void {
    this.ngSelectComponentRef.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.ngSelectComponentRef.registerOnTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.ngSelectComponentRef.setDisabledState(isDisabled);
    this.disabled = isDisabled;
    if (isDisabled) {
      this.isOpen = false;
    }
  }

  public override onFocus() {
    if (!this.ngSelectComponentRef) {
      console.warn('Missing NgSelectComponent ref');
      return;
    }

    this.ngSelectComponentRef.focus();
    setTimeout(() => {
      // @ts-ignore
      this.ngSelectComponentRef._manualOpen = false;
      // Postpone open event (focus event does prevent open event)
      this.ngSelectComponentRef.open();
    }, 0);
  }
}

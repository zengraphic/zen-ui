import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, Type, ElementRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { v4 as uuid } from 'uuid';
import { Subscription } from 'rxjs';

import { INPUT_BASE_ERROR_PREFIX } from '../../models/input.model';

@Component({ template: '' })
export abstract class InputBaseComponent implements AfterViewInit, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() ariaLabel: string = '';
  @Input() maxLength: number = -1;
  @Input() validateOnBlur: boolean = false;
  @Output() keyupChange: EventEmitter<any> = new EventEmitter();
  @Output() onFocusError: EventEmitter<any> = new EventEmitter();
  @Output() onBlurError: EventEmitter<any> = new EventEmitter();
  @Input() additionalClasses: string[] = [];

  public id = `input_${uuid()}`;
  public formControl: FormControl | undefined;
  public formControlName: string | number | null = '';

  public isFocused: boolean = false;

  private subscriptions: Subscription = new Subscription();
  private translateService: TranslateService | null | undefined;
  elementRef: ElementRef;
  protected ref: ChangeDetectorRef | null = {
    markForCheck: () => {}
  } as ChangeDetectorRef;

  protected constructor(protected injector: Injector) {
  }

  ngAfterViewInit() {
    this.setFormControl();
    this.setInjectedServices();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get errorMessage(): string {
    const [firstErrorKey] = Object.keys(this.formControl?.errors || {});
    const errorLabelKey = `${INPUT_BASE_ERROR_PREFIX}${firstErrorKey}`;

    return this.translateService ? this.translateService.instant(errorLabelKey) : errorLabelKey;
  }

  get isInvalid(): boolean {
    return Boolean(this.formControl && this.formControl.errors && this.formControl.touched);
  }

  public onKeyup($event: any) {
    this.keyupChange.emit($event);
  }

  public onFocus($event: any) {
    this.isFocused = true;
    this.formControl?.updateValueAndValidity();
  }

  public onBlur($event: any) {
    if (this.isInvalid) {
      this.onBlurError.emit({
        key: this.formControlName,
        errors: this.formControl?.errors
      });
    }
  }

  private setInjectedServices() {
    this.translateService = this.injector.get(TranslateService as Type<TranslateService>, null);
    this.ref = this.injector.get(ChangeDetectorRef as Type<ChangeDetectorRef>, null);
    this.elementRef = this.injector.get(ElementRef as Type<ElementRef>);

    if (this.ref) {
      // Detect changes to show pending error (if present)
      this.ref.detectChanges();
    }
  }

  private setFormControl() {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    console.log(ngControl)
    if (ngControl) {
      this.formControl = ngControl.control as FormControl;
      this.formControlName = ngControl.name;
      this.subscriptions.add(
        this.formControl?.statusChanges.subscribe(() => {
          this.ref?.markForCheck();
        })
      );
    } else {
      throw Error('Missing ngControl');
    }
  }
  

}

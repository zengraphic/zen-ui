import { NgModule } from '@angular/core';
import { InputTextComponent } from './components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { ButtonComponent } from './components/button/button.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { NgSelectModule } from '@ng-select/ng-select';

const components = [
  InputTextComponent,
  InputCheckboxComponent,
  InputRadioComponent,
  ButtonComponent,
  InputSelectComponent,
];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,

    // Angular deps
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule,
    NgSelectModule,
  ],
  exports: [...components],
})
export class ZenUikitLibModule {}

import { NgModule } from '@angular/core';
import { InputTextComponent } from './components/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';


const components = [
  InputTextComponent,
  InputCheckboxComponent,
  InputRadioComponent
]
@NgModule({
  declarations: [
    InputTextComponent,
  InputCheckboxComponent,
  InputRadioComponent
  ],
  imports: [
    CommonModule,

    // Angular deps
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    PortalModule

  ],
  exports: [
    InputTextComponent,
  InputCheckboxComponent,
  InputRadioComponent,
  ]
})
export class ZenUikitLibModule { }

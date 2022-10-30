import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZenUikitLibModule } from '../../../zen-uikit-lib/src/lib/zen-uikit-lib.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ZenUikitLibModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

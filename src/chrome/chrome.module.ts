import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChromeComponent } from './chrome.component';

import { CheckboardModule } from '../common/checkboard/checkboard.module';
import { HueModule } from '../common/hue/hue.module';
import { AlphaModule } from '../common/alpha/alpha.module';
import { EditableInputModule } from '../common/editable-input/editable-input.module';
import { SaturationModule } from '../common/saturation/saturation.module';

@NgModule({
  imports: [
    CommonModule,
    CheckboardModule,
    HueModule,
    AlphaModule,
    EditableInputModule,
    SaturationModule
  ],
  declarations: [ChromeComponent],
  exports: [ChromeComponent]
})
export class ChromeModule {}

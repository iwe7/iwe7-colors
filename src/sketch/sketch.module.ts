import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SketchComponent } from './sketch.component';
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
  declarations: [SketchComponent],
  exports: [SketchComponent]
})
export class SketchModule {}

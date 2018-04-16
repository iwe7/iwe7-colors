import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsStylesComponent } from './colors-styles.component';

import { ChromeModule } from '../chrome/chrome.module';
import { CompactModule } from '../compact/compact.module';
import { GrayscaleModule } from '../grayscale/grayscale.module';
import { MaterialModule } from '../material/material.module';
import { PhotoshopModule } from '../photoshop/photoshop.module';
import { SketchModule } from '../sketch/sketch.module';
import { SliderModule } from '../slider/slider.module';
import { SwatchesModule } from '../swatches/swatches.module';

@NgModule({
  imports: [
    CommonModule,
    ChromeModule,
    CompactModule,
    GrayscaleModule,
    MaterialModule,
    PhotoshopModule,
    SketchModule,
    SliderModule,
    SwatchesModule
  ],
  declarations: [ColorsStylesComponent],
  exports: [ColorsStylesComponent]
})
export class ColorsStylesModule { }

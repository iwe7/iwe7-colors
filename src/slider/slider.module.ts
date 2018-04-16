import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { HueModule } from '../common/hue/hue.module';

@NgModule({
  imports: [CommonModule, HueModule],
  declarations: [SliderComponent],
  exports: [SliderComponent]
})
export class SliderModule {}

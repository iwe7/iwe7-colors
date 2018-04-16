import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HueComponent } from './hue.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HueComponent],
  exports: [HueComponent]
})
export class HueModule {}

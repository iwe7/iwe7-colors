import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrayscaleComponent } from './grayscale.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GrayscaleComponent],
  exports: [GrayscaleComponent]
})
export class GrayscaleModule {}

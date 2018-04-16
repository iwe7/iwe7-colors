import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwatchesComponent } from './swatches.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SwatchesComponent],
  exports: [SwatchesComponent]
})
export class SwatchesModule {}

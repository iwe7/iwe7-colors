import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphaComponent } from './alpha.component';
import { CheckboardModule } from '../checkboard/checkboard.module';
@NgModule({
  imports: [CommonModule, CheckboardModule],
  declarations: [AlphaComponent],
  exports: [AlphaComponent]
})
export class AlphaModule {}

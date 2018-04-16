import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboardComponent } from './checkboard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CheckboardComponent],
  exports: [CheckboardComponent]
})
export class CheckboardModule {}

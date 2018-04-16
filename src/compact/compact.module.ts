import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompactComponent } from './compact.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CompactComponent],
  exports: [CompactComponent]
})
export class CompactModule {}

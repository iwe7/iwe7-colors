import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsStylesModule } from './colors-styles/colors-styles.module';

@NgModule({
  imports: [
    ColorsStylesModule
  ],
  exports: [
    ColorsStylesModule
  ]
})
export class Iwe7ColorsModule {}

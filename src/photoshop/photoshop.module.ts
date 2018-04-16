import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoshopComponent } from './photoshop.component';
import { EditableInputModule } from '../common/editable-input/editable-input.module';
import { SaturationModule } from '../common/saturation/saturation.module';
import { HueModule } from '../common/hue/hue.module';
@NgModule({
  imports: [CommonModule, EditableInputModule, SaturationModule, HueModule],
  declarations: [PhotoshopComponent],
  exports: [PhotoshopComponent]
})
export class PhotoshopModule {}

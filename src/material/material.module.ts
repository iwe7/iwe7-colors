import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import { EditableInputModule } from '../common/editable-input/editable-input.module';

@NgModule({
  imports: [CommonModule, EditableInputModule],
  declarations: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule {}

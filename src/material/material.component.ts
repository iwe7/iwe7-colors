import { Component, OnInit, Injector, ViewEncapsulation, HostBinding } from '@angular/core';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: 'material,material-picker',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialComponent extends DesignBase<any> implements OnInit {
  @HostBinding('class.vc-material') _material: boolean = true;
  constructor(injector: Injector) {
    super(injector);
  }
}

import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: 'photoshop,photoshop-picker',
  templateUrl: './photoshop.component.html',
  styleUrls: ['./photoshop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoshopComponent extends DesignBase<any> implements OnInit {
  colors: any;
  disableFields: boolean = false;
  currentColor: string;
  constructor(injector: Injector) {
    super(injector);
  }
  handleAccept() {}

  handleCancel() {}

  clickCurrentColor(){}
}

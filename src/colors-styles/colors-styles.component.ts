import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
let defaultColor = {
  hex: '#194d33',
  hsl: {
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1
  },
  hsv: {
    h: 150,
    s: 0.66,
    v: 0.3,
    a: 1
  },
  rgba: {
    r: 25,
    g: 77,
    b: 51,
    a: 1
  },
  a: 1
};
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: '[colors-styles]',
  templateUrl: './colors-styles.component.html',
  styleUrls: ['./colors-styles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorsStylesComponent extends DesignBase<any> implements OnInit {
  constructor(i: Injector) {
    super(i);
  }
  ngOnInit() {
    this.props.next({
      colors: defaultColor
    });
    super.ngOnInit();
  }

  onPropsChange(e: any) {}
}

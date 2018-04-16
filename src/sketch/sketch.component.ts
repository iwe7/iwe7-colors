import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: 'sketch,sketch-picker',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SketchComponent extends DesignBase<any> implements OnInit {
  presetColors = [
    '#D0021B',
    '#F5A623',
    '#F8E71C',
    '#8B572A',
    '#7ED321',
    '#417505',
    '#BD10E0',
    '#9013FE',
    '#4A90E2',
    '#50E3C2',
    '#B8E986',
    '#000000',
    '#4A4A4A',
    '#9B9B9B',
    '#FFFFFF'
  ];
  constructor(injector: Injector) {
    super(injector);
  }
  activeColor: any;
  colors: any;
  onPropsChange(e) {
    if ('colors' in e) {
      this.colors = e['colors'];
      const rgba = this.colors.rgba;
      this.activeColor = 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')';
    }
    super.onPropsChange(e);
  }

  handlePreset(c) {
    let color = {
      hex: c,
      source: 'hex'
    };
    let colors = colorChange(color);
    this.props.next({
      ...this._props,
      colors: colors
    });
  }
}

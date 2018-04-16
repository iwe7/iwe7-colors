import { Component, OnInit, Injector } from '@angular/core';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: 'slider,slider-picker',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent extends DesignBase<any> implements OnInit {
  swatches = ['.80', '.65', '.50', '.35', '.20'];
  activeOffset: any;
  colors: any;
  constructor(i: Injector) {
    super(i);
  }

  onPropsChange(e: any) {
    if ('colors' in e) {
      this.colors = e['colors'];
    }
    super.onPropsChange(e);
  }

  handleSwClick(index, offset) {
    this.activeOffset = offset;
    let color = {
      h: this.colors.hsl.h,
      s: 0.5,
      l: offset,
      source: 'hsl'
    };
    let colors = colorChange(color);
    this.props.next({
      ...this._props,
      colors: colors
    });
  }
}

import {
  Component,
  OnInit,
  Injector,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
const defaultColors = [
  '#FFFFFF',
  '#F2F2F2',
  '#E6E6E6',
  '#D9D9D9',
  '#CCCCCC',
  '#BFBFBF',
  '#B3B3B3',
  '#A6A6A6',
  '#999999',
  '#8C8C8C',
  '#808080',
  '#737373',
  '#666666',
  '#595959',
  '#4D4D4D',
  '#404040',
  '#333333',
  '#262626',
  '#0D0D0D',
  '#000000'
];
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: 'grayscale,grayscale-picker',
  templateUrl: './grayscale.component.html',
  styleUrls: ['./grayscale.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GrayscaleComponent extends DesignBase<any> implements OnInit {
  @HostBinding('class.vc-grayscale') _grayscale: boolean = true;
  palette: any = defaultColors;

  constructor(injector: Injector) {
    super(injector);
  }

  handlerClick(c) {
    console.log(c);
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

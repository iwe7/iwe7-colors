import {
  Component,
  OnInit,
  Injector,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
let defaultColors = [
  '#4D4D4D',
  '#999999',
  '#FFFFFF',
  '#F44E3B',
  '#FE9200',
  '#FCDC00',
  '#DBDF00',
  '#A4DD00',
  '#68CCCA',
  '#73D8FF',
  '#AEA1FF',
  '#FDA1FF',
  '#333333',
  '#808080',
  '#CCCCCC',
  '#D33115',
  '#E27300',
  '#FCC400',
  '#B0BC00',
  '#68BC00',
  '#16A5A5',
  '#009CE0',
  '#7B64FF',
  '#FA28FF',
  '#000000',
  '#666666',
  '#B3B3B3',
  '#9F0500',
  '#C45100',
  '#FB9E00',
  '#808900',
  '#194D33',
  '#0C797D',
  '#0062B1',
  '#653294',
  '#AB149E'
];
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
@Component({
  selector: 'compact,compact-picker',
  templateUrl: './compact.component.html',
  styleUrls: ['./compact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompactComponent extends DesignBase<any> implements OnInit {
  @HostBinding('class.vc-compact') _compact: boolean = true;
  palette: any = defaultColors;

  constructor(injector: Injector) {
    super(injector);
  }

  handlerClick(c) {
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

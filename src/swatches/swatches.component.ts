import { Component, OnInit, Injector } from '@angular/core';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
import material from 'material-colors';
@Component({
  selector: 'swatches,swatches-picker',
  templateUrl: './swatches.component.html',
  styleUrls: ['./swatches.component.scss']
})
export class SwatchesComponent extends DesignBase<any> implements OnInit {
  colorMap = [
    'red',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    'blue',
    'lightBlue',
    'cyan',
    'teal',
    'green',
    'lightGreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deepOrange',
    'brown',
    'blueGrey',
    'black'
  ];
  colorLevel = ['900', '700', '500', '300', '100'];
  palette: any[] = [];
  colors: any;

  hex: string;
  constructor(i: Injector) {
    super(i);
  }

  ngOnInit() {
    this.palette = this.setColors();
    super.ngOnInit();
  }

  onPropsChange(e) {
    if ('colors' in e) {
      this.colors = e['colors'];
      this.hex = this.colors.hex.toLowerCase();
    }
  }

  setColors() {
    let colors = [];
    this.colorMap.forEach(type => {
      let typeColor = [];
      if (type.toLowerCase() === 'black' || type.toLowerCase() === 'white') {
        typeColor = typeColor.concat(['#000000', '#FFFFFF']);
      } else {
        this.colorLevel.forEach(level => {
          const color = material[type][level];
          typeColor.push(color.toUpperCase());
        });
      }
      colors.push(typeColor);
    });
    return colors;
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

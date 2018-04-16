import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Input,
  AfterViewInit,
  HostBinding
} from '@angular/core';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../utils/color-change';
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
@Component({
  selector: 'chrome,chrome-picker',
  templateUrl: './chrome.component.html',
  styleUrls: ['./chrome.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChromeComponent extends DesignBase<any>
  implements OnInit, AfterViewInit {
  fieldsIndex: number = 2;
  disableFields: boolean = false;
  disableAlpha: boolean = false;
  highlight: boolean = true;
  activeColor: any;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {}
  colors: any;
  onPropsChange(e) {
    if ('colors' in e) {
      this.colors = e['colors'];
      let { a } = this.colors;
      const rgba = this.colors.rgba;
      this.activeColor = 'rgba(' + [rgba.r, rgba.g, rgba.b, a].join(',') + ')';
    }
    super.onPropsChange(e);
  }

  switch() {
    if (this.fieldsIndex >= 2) {
      this.fieldsIndex = this.colors.a < 1 ? 1 : 0;
      return;
    }
    this.fieldsIndex++;
  }
}

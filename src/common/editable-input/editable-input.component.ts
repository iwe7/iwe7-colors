import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Injector,
  Input,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { tap, pluck, map, debounceTime } from 'rxjs/operators';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../../utils/color-change';
import { MathService } from 'iwe7/math';
@Component({
  selector: 'ed-in',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableInputComponent extends DesignBase<any> implements OnInit {
  @HostBinding('class.vc-editable-input') _input: boolean = true;
  @Input() label: string;
  @Input() desc: string;
  value: any = 0;
  max: number;
  min: number;
  step: number = 1;

  isFirst: boolean = false;

  @ViewChild('input') input: ElementRef;
  type: string = 'number';
  colors: any;

  isFocus: boolean;
  setValue(val) {
    if (!this.isFocus) {
      this.value = val;
    }
  }
  onPropsChange(e: any) {
    if ('colors' in e) {
      this.colors = e['colors'];
      if (this.label === 'hex') {
        let hex = this.colors.hex;
        let hexs = hex.split('#');
        this.setValue(hexs[1]);
        this.type = 'text';
      }
      if (['r', 'g', 'b', 'a'].indexOf(this.label) > -1) {
        let rgba = this.colors.rgba;
        this.setValue(rgba[this.label]);
        if (this.label === 'a') {
          this.step = 0.01;
          this.max = 1;
          this.min = 0;
        } else {
          this.step = 1;
          this.max = 255;
          this.min = 0;
        }
        this.type = 'number';
      }
      if (['h', 's', 'l'].indexOf(this.label) > -1) {
        let hsl = this.colors.hsl;
        this.setValue(hsl[this.label]);
        if (['s', 'l'].indexOf(this.label) > -1) {
          this.step = 0.01;
          this.max = 1;
          this.min = 0;
        } else {
          this.step = 1;
          this.max = 255;
          this.min = 0;
        }
        this.type = 'number';
      }
    }
    super.onPropsChange(e);
  }
  constructor(injector: Injector, public math: MathService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  checkMaxMin() {
    if (this.max != undefined) {
      if (this.value >= this.max) {
        this.value = this.max;
      }
    }
    if (this.min != undefined) {
      if (this.value <= this.min) {
        this.value = this.min;
      }
    }
  }

  handleChange() {
    let data = {};
    data[this.label] = this.value;
    if (this.label === 'hex') {
      if (`${this.value}`.length > 2) {
        // 大于5时改变
        let color = {
          hex: this.value,
          source: 'hex'
        };
        let colors = colorChange(color);
        this.props.next({
          ...this._props,
          colors: colors
        });
      }
    } else if (['r', 'g', 'b', 'a'].indexOf(this.label) > -1) {
      let rgba = this.colors.rgba;
      let color = {
        r: data['r'] || rgba.r,
        g: data['g'] || rgba.g,
        b: data['b'] || rgba.b,
        a: data['a'] || rgba.a,
        source: 'rgba'
      };
      let colors = colorChange(color);
      this.props.next({
        ...this._props,
        colors: colors
      });
    } else if (['h', 's', 'l'].indexOf(this.label) > -1) {
      let color = {
        h: data['h'] || this.colors.hsl.h,
        s: data['s'] || this.colors.hsl.s,
        l: data['l'] || this.colors.hsl.l,
        source: 'hsl'
      };
      if (color.s > 1) {
        color.s = color.s / 100;
      }
      if (color.l > 1) {
        color.l = color.l / 100;
      }
      let colors = colorChange(color);
      this.props.next({
        ...this._props,
        colors: colors
      });
    }
  }
}

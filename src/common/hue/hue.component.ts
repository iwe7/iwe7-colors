import {
  Component,
  OnInit,
  HostBinding,
  Input,
  ElementRef,
  ViewChild,
  Injector,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  map,
  tap,
  takeUntil,
  switchMap,
  filter,
  debounceTime
} from 'rxjs/operators';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../../utils/color-change';

@Component({
  selector: 'hue',
  templateUrl: './hue.component.html',
  styleUrls: ['./hue.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HueComponent extends DesignBase<any> implements OnInit {
  @Input() colors: any = {};
  @Input() direction: string = 'horizontal';

  oldHue: number = 0;
  pullDirection: string = '';

  get directionClass() {
    return {
      'vc-hue--horizontal': this.direction === 'horizontal',
      'vc-hue--vertical': this.direction === 'vertical'
    };
  }
  pointerTop: any = 0;
  pointerLeft: any = 0;

  @ViewChild('pointer') pointer: ElementRef;

  onPropsChange(e) {
    if ('colors' in e) {
      this.setColors(e['colors']);
    }
    super.onPropsChange(e);
  }
  constructor(injector: Injector) {
    super(injector);
  }

  setColors(colors) {
    const h = colors.hsl.h;
    if (h !== 0 && h - this.oldHue > 0) this.pullDirection = 'right';
    if (h !== 0 && h - this.oldHue < 0) this.pullDirection = 'left';
    this.oldHue = h;
    this.colors = colors;
    this.setPointerLeft();
    this.setPointerTop();
  }

  setPointerLeft() {
    if (this.direction === 'vertical') {
      this.pointerLeft = 0;
    } else {
      if (this.colors.hsl.h === 0 && this.pullDirection === 'right') {
        this.pointerLeft = '100%';
      }
      this.pointerLeft = this.colors.hsl.h * 100 / 360 + '%';
    }
  }

  setPointerTop() {
    if (this.direction === 'vertical') {
      if (this.colors.hsl.h === 0 && this.pullDirection === 'right') return 0;
      this.pointerTop = -(this.colors.hsl.h * 100 / 360) + 100 + '%';
    } else {
      this.pointerTop = 0;
    }
  }
  ngOnInit() {
    let mousedown = fromEvent(this.pointer.nativeElement, 'mousedown');
    let mousemove = fromEvent(this.pointer.nativeElement, 'mousemove');
    let mouseup = fromEvent(document, 'mouseup');
    mousedown
      .pipe(
        // debug
        switchMap(res => {
          return mousemove.pipe(
            map((res: MouseEvent) => ({
              type: res.type,
              pageX: res.pageX,
              pageY: res.pageY
            })),
            map(res => {
              let size = this.getSize();
              return {
                left: res.pageX - size.xOffset,
                top: res.pageY - size.yOffset,
                ...size
              };
            }),
            map(res => {
              let h, percent;
              let top = res.top;
              let left = res.left;
              if (this.direction === 'vertical') {
                if (top < 0) {
                  h = 360;
                } else if (top > res.height) {
                  h = 0;
                } else {
                  percent = -(top * 100 / res.height) + 100;
                  h = 360 * percent / 100;
                }
                if (this.colors.hsl.h !== h) {
                  this.colors.hsl.h = h;
                  this.props.next({
                    ...this._props,
                    colors: this.colors
                  });
                }
              } else {
                if (left < 0) {
                  h = 0;
                } else if (left > res.width) {
                  h = 360;
                } else {
                  percent = left * 100 / res.width;
                  h = 360 * percent / 100;
                }
                if (this.colors.hsl.h !== h) {
                  let color = {
                    h: h,
                    s: this.colors.hsl.s,
                    l: this.colors.hsl.l,
                    a: this.colors.hsl.a,
                    source: 'hsl'
                  };
                  let colors = colorChange(color);
                  this.props.next({
                    ...this._props,
                    colors: colors
                  });
                }
              }
            }),
            filter(res => !!res),
            takeUntil(mouseup),
            debounceTime(200)
          );
        })
      )
      .subscribe(res => {
        this.__events.next({
          type: 'change',
          data: res
        });
      });
    super.ngOnInit();
  }

  private getSize() {
    let rect = this.pointer.nativeElement.getBoundingClientRect();
    return {
      width: this.pointer.nativeElement.clientWidth,
      height: this.pointer.nativeElement.clientHeight,
      xOffset: rect.left + window.pageXOffset,
      yOffset: rect.top + window.pageYOffset
    };
  }
}

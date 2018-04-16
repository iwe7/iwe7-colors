import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Injector,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  takeUntil,
  filter,
  debounceTime
} from 'rxjs/operators';
import { DesignBase } from 'iwe7/design';
import { colorChange } from '../../utils/color-change';
@Component({
  selector: 'alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlphaComponent extends DesignBase<any> implements OnInit {
  colors: any;
  get gradientColor() {
    let rgba = this.colors.rgba;
    let rgbStr = [rgba.r, rgba.g, rgba.b].join(',');
    return (
      'linear-gradient(to right, rgba(' +
      rgbStr +
      ', 0) 0%, rgba(' +
      rgbStr +
      ', 1) 100%)'
    );
  }
  @ViewChild('container') container: ElementRef;

  pointerLeft: any = 0;

  constructor(injector: Injector) {
    super(injector);
  }

  onPropsChange(e) {
    if ('colors' in e) {
      this.colors = e['colors'];
      this.setPointerLeft();
    }
    super.onPropsChange(e);
  }

  setPointerLeft() {
    this.pointerLeft = this.colors.a * 100 + '%';
  }

  ngOnInit() {
    let mousedown = fromEvent(this.container.nativeElement, 'mousedown');
    let mousemove = fromEvent(this.container.nativeElement, 'mousemove');
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
              let left = res.left;
              let a;
              if (left < 0) {
                a = 0;
              } else if (left > res.width) {
                a = 1;
              } else {
                a = Math.round(left * 100 / res.width) / 100;
              }
              if (this.colors.a !== a) {
                let color = {
                  h: this.colors.hsl.h,
                  s: this.colors.hsl.s,
                  l: this.colors.hsl.l,
                  a: a,
                  source: 'rgba'
                };
                let colors = colorChange(color);
                // 颜色转化
                this.props.next({
                  ...this._props,
                  colors: colors
                });
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
    let rect = this.container.nativeElement.getBoundingClientRect();
    return {
      width: this.container.nativeElement.clientWidth,
      height: this.container.nativeElement.clientHeight,
      xOffset: rect.left + window.pageXOffset,
      yOffset: rect.top + window.pageYOffset
    };
  }
}

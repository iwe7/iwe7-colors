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
  selector: 'saturation',
  templateUrl: './saturation.component.html',
  styleUrls: ['./saturation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaturationComponent extends DesignBase<any> implements OnInit {
  @ViewChild('panel') panel: ElementRef;
  @Input()
  value: any = {
    hsv: {
      h: 0,
      l: 0,
      a: 0,
      s: 0
    }
  };

  colors: any;
  bgColor: string;
  pointerTop: string;
  pointerLeft: string;

  constructor(injector: Injector) {
    super(injector);
  }

  onPropsChange(e: any) {
    if ('colors' in e) {
      this.colors = e['colors'];
      this.bgColor = `hsl(${this.colors.hsv.h}, 100%, 50%)`;
      this.pointerTop = -(this.colors.hsv.v * 100) + 1 + 100 + '%';
      this.pointerLeft = this.colors.hsv.s * 100 + '%';
    }
    super.onPropsChange(e);
  }

  ngOnInit() {
    let mousedown = fromEvent(this.panel.nativeElement, 'mousedown');
    let mousemove = fromEvent(this.panel.nativeElement, 'mousemove');
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
              let top = res.top;
              let left = res.left;
              if (left < 0) {
                left = 0;
              } else if (left > res.width) {
                left = res.width;
              } else if (top < 0) {
                top = 0;
              } else if (top > res.height) {
                top = res.height;
              }

              let saturation = left / res.width;
              let bright = -(top / res.height) + 1;

              bright = bright > 0 ? bright : 0;
              bright = bright > 1 ? 1 : bright;
              let color = {
                h: this.colors.hsv.h,
                s: saturation,
                v: bright,
                a: this.colors.hsv.a,
                source: 'hsva'
              };
              let colors = colorChange(color);
              this.props.next({
                ...this._props,
                colors: colors
              });
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
    let rect = this.panel.nativeElement.getBoundingClientRect();
    return {
      width: this.panel.nativeElement.clientWidth,
      height: this.panel.nativeElement.clientHeight,
      xOffset: rect.left + window.pageXOffset,
      yOffset: rect.top + window.pageYOffset
    };
  }
}

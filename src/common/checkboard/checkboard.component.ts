import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'checkboard',
  templateUrl: './checkboard.component.html',
  styleUrls: ['./checkboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboardComponent {
  size: number = 8;
  white: string = '#fff';
  grey: string = '#e6e6e6';
  constructor() {}
  bgStyle() {
    return {
      'background-image':
        'url(' + getCheckboard(this.white, this.grey, this.size) + ')'
    };
  }
}
let _checkboardCache = {};
function renderCheckboard(c1, c2, size) {
  if (typeof document === 'undefined') {
    return null;
  }
  let canvas = document.createElement('canvas');
  canvas.width = canvas.height = size * 2;
  let ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}
function getCheckboard(c1, c2, size) {
  let key = c1 + ',' + c2 + ',' + size;
  if (_checkboardCache[key]) {
    return _checkboardCache[key];
  } else {
    let checkboard = renderCheckboard(c1, c2, size);
    _checkboardCache[key] = checkboard;
    return checkboard;
  }
}

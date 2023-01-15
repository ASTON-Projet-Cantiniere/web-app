import {Component, OnInit} from '@angular/core';
import {Gradient} from './gradient';
@Component({
  selector: 'app-background',
  template: `<canvas id="gradient-canvas"></canvas>`,
  styles: [`
    #gradient-canvas {
      --gradient-color-1: #fafafa;
      --gradient-color-2: #ffffff;
      --gradient-color-3: #efdfcf;
      --gradient-color-4: #fcf6f3;
      clip-path: polygon(0 0, 60% 0, 0 80%);
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class BackgroundComponent implements OnInit {
  ngOnInit() {
    const gradient = new Gradient();
    // @ts-ignore
    gradient.initGradient('#gradient-canvas');
  }
}

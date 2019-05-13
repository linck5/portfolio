import { Component, OnInit } from '@angular/core';
import { BackgroundCanvasService } from './background-canvas.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private bg:BackgroundCanvasService) { }

  ngOnInit() {
    this.bg.init();
  }


}

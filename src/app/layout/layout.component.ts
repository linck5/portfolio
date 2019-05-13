import { Component, OnInit } from '@angular/core';
import { BackgroundCanvasService } from './background-canvas.service'
import  $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private bg:BackgroundCanvasService) { }

  ngOnInit() {

    this.bg.init('bg-canvas', 'bg-canvas-container', ()=>{
      return $("#end-of-page").position().top
    });
  }


}

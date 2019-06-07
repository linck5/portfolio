import { Component, OnInit } from '@angular/core';
import { BackgroundCanvasService } from './background-canvas.service'
import { ActivatedRoute } from '@angular/router';
import  $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  removeContactInformation = false;

  constructor(
      private route: ActivatedRoute,
      private bg:BackgroundCanvasService) { }

  ngOnInit() {

    this.route.url.subscribe((url) => {
      if(url.length > 0 && url[0].path == "nci"){
        this.removeContactInformation = true;
      }
    });


    this.bg.init('bg-canvas', 'bg-canvas-container', ()=>{
      return $("#end-of-page").position().top
    });
  }


}

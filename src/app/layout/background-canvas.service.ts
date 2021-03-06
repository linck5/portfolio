import { Injectable } from '@angular/core';
import { FpsCtrl } from './fps-control'
import  $ from 'jquery';

@Injectable({
  providedIn: 'root'
})

 //https://codepen.io/mariandev/pen/OVONVL?editors=1010
export class BackgroundCanvasService {



hexagon_radius = 80;
hexagon_max_absolute_speed = 0.1;
hexagon_space_between = 3;
hexagon_line_width = 2;
hexagon_color = '#022';
expectedPageHeight = 13000;
expectedPageHeightLeeWay = 2000;


canvas;
ctx;
canvasId;
canvasContainerId;
getPageHeight;
requestAnimFrame;
fc;
hexagons = [];
refreshing = false;
currHeight = null;
resizeRefreshScheduled = false;
fps = 24;



s3p3 = Math.sqrt(3);


  constructor() {
    this.fc = new FpsCtrl(this.fps, this.loop.bind(this))
  }

  refresh() {
    this.refreshing = true;
  }

  init(canvasId:string, canvasContainerId:string, getPageHeight:()=>number) {

    this.canvasId = canvasId;
    this.canvasContainerId = canvasContainerId;
    this.getPageHeight = getPageHeight;

    window.addEventListener('resize', ()=>{
      if(!this.resizeRefreshScheduled){
        this.resizeRefreshScheduled = true;
        setTimeout(()=>{
          this.refresh();
          this.resizeRefreshScheduled = false;
        }, 500)
      }
    })

    setInterval(()=>{

      if(this.currHeight < this.getPageHeight()){
        console.warn("page height was higher than expected")
        this.currHeight = this.getPageHeight() + this.expectedPageHeightLeeWay;
        this.refresh();
      }

      if($(`#${this.canvasContainerId}`).css('height') != this.getPageHeight() + 'px'){
        $(`#${this.canvasContainerId}`).css('height', this.getPageHeight() + 'px')
      }
    }, 500)


    this.start()
  }



  start() {


    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = window.innerWidth;

    if(!this.currHeight){
      this.currHeight = this.expectedPageHeight + this.expectedPageHeightLeeWay;
    }
    this.canvas.height = this.currHeight
    this.canvas.style.height = this.currHeight + 'px'


    this.ctx = this.canvas.getContext('2d', { alpha: false });

    this.ctx.globalCompositeOperation = "source-over";

    var hw = Math.ceil( this.canvas.width / ( 1.5 * this.hexagon_radius + this.hexagon_space_between * 2 ) ) + 1;
    var hh = Math.ceil( this.canvas.height / ( this.s3p3 * this.hexagon_radius + this.hexagon_space_between * 2 ) ) + 1;

    for(var x = 0;x<hw;x++) {
      for(var y=0;y<hh;y++) {
        if(Math.random() > 0.8) continue;
        this.addHexagon(
          this.hexagon_radius + this.hexagon_space_between + ( 1.5 * this.hexagon_radius + this.hexagon_space_between * 2 ) * x,
          this.s3p3 * this.hexagon_radius / 2 + this.hexagon_space_between + ( this.s3p3 * this.hexagon_radius + this.hexagon_space_between * 2 ) * y - ( x%2 ? this.s3p3 * this.hexagon_radius / 2 : 0 ),
          {
            l: 0
          }
        );
      }
    }



    this.ctx.lineWidth = this.hexagon_line_width;

    this.fc.start();


  }




  private loop() {

    if(this.refreshing){
      this.refreshing = false;
      this.hexagons = [];
      this.start();
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000808';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();

    let viewport_top = window.pageYOffset;
    let viewport_bot = window.pageYOffset + window.innerHeight;

    for(var i=0;i<this.hexagons.length;i++){
      let hex_y = this.hexagons[i].y;
      if(
        hex_y < viewport_bot + this.hexagon_radius &&
        hex_y > viewport_top - this.hexagon_radius
      ) {

        this.drawHexagonPath(i);
      }

    }


    this.ctx.shadowColor = this.hexagon_color;
    this.ctx.shadowBlur = 20;
    this.ctx.strokeStyle = this.hexagon_color;
    this.ctx.stroke();

  }

  private addHexagon(x, y, opts) {
    var l = Math.floor(Math.random() * 6),
      p = Math.random();

    if(!opts) opts = {};

    this.hexagons.push({
      sl: opts.l || opts.l === 0 ? opts.l : l,
      p: opts.p || opts.p === 0 ? opts.p : p,
      x: x,
      y: y,
      speed: opts.speed || opts.speed === 0 ? opts.speed : ( Math.random() * this.hexagon_max_absolute_speed * 2 - this.hexagon_max_absolute_speed )
    });
  }

  private drawHexagonPath(hex_index) {

    var hex = this.hexagons[hex_index];



    this.ctx.moveTo(
      hex.x + Math.cos( Math.PI / 3 * hex.sl ) * this.hexagon_radius + Math.cos( Math.PI / 3 * (hex.sl + 2) ) * this.hexagon_radius * hex.p,
      hex.y + Math.sin( Math.PI / 3 * hex.sl ) * this.hexagon_radius +  Math.sin( Math.PI / 3 * (hex.sl + 2) ) * this.hexagon_radius * hex.p
    );

    //this.ctx.moveTo(hex.x, hex.y);

    this.ctx.lineTo(
      hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 1 ) ) * this.hexagon_radius,
      hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 1 ) ) * this.hexagon_radius
    );

    this.ctx.lineTo(
      hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 2 ) ) * this.hexagon_radius,
      hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 2 ) ) * this.hexagon_radius
    );

    this.ctx.lineTo(
      hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 3 ) ) * this.hexagon_radius,
      hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 3 ) ) * this.hexagon_radius
    );

    this.ctx.lineTo(
      hex.x + Math.cos( Math.PI / 3 * ( hex.sl + 3 ) ) * this.hexagon_radius + Math.cos( Math.PI / 3 * (hex.sl + 5) ) * this.hexagon_radius * hex.p,
      hex.y + Math.sin( Math.PI / 3 * ( hex.sl + 3 ) ) * this.hexagon_radius + Math.sin( Math.PI / 3 * (hex.sl + 5) ) * this.hexagon_radius * hex.p
    );

    hex.p += hex.speed;
    if(hex.p > 1 || hex.p < 0) {
      hex.p = hex.speed < 0 ? 1 : 0;
      hex.sl += hex.speed < 0 ? -1 : 1;
      hex.sl = hex.sl % 6;
      hex.sl = hex.sl < 0 ? 4 - hex.sl : hex.sl;
    }

    this.hexagons[hex_index] = hex;

  }

}

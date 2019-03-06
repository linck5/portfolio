import { Component, OnInit, NgModule } from '@angular/core';
import { MyworkPipe } from './mywork.pipe'

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrls: ['./mywork.component.scss']
})
export class MyworkComponent implements OnInit {

  works:object[] = [
    {
      title: "a web dev work",
      imageUrl: 'asdçfljsa',
      description: 'some web dev work',
      type: 'web'
    },
    {
      title: "a game dev work",
      imageUrl: 'asddsfçfljsa',
      description: 'some game dev stuff',
      type: 'gamedev'
    }
  ]

  workType:string = "all";

  constructor() { }

  ngOnInit() { }

}

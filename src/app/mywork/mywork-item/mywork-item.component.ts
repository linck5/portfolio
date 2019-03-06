import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mywork-item',
  templateUrl: './mywork-item.component.html',
  styleUrls: ['./mywork-item.component.scss']
})
export class MyworkItemComponent implements OnInit {

  @Input() public work:any

  constructor() { }

  ngOnInit() {
  }

}

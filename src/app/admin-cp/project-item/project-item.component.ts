import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() public project:any

  constructor() { }

  ngOnInit() {

  }

  onDelete(project) {
    console.log('will delete ' + project._id)
  }

}

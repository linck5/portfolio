import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() public project:any
  @Output() projectDeleted = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  }

  onDelete(project) {
    console.log('will delete ' + project._id)
    this.projectDeleted.emit();
  }

}

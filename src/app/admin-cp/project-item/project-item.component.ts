import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/globalServices/http-service/http.service'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project:any
  @Input() credentialsForm; //TODO type it
  @Output() projectDeleted = new EventEmitter<string>();

  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  async onDelete(project) {
    await this.httpService.delete(`/project/${project._id}`, this.credentialsForm)
    .subscribe()
    this.projectDeleted.emit();
  }

}

import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/globalServices/http-service/http.service'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss', '../admin-cp.shared.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project:any
  @Input() credentialsForm; //TODO type it
  @Output() projectDeleted = new EventEmitter<string>();
  @Output() projectCopied = new EventEmitter<string>();

  @ViewChild('collapsible') collapsible;
  @ViewChild('content') content;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.addCollapsibleBehavior()
  }

  private addCollapsibleBehavior(){

    this.collapsible.nativeElement.addEventListener("click", function(event) {
      console.log(this.collapsible)
      this.collapsible.nativeElement.classList.toggle("active");
      if (this.content.nativeElement.style.display === "block") {
        this.content.nativeElement.style.display = "none";
      } else {
        this.content.nativeElement.style.display = "block";
      }
    }.bind(this))
  }

  onCopy(project){
    this.projectCopied.emit();
  }

  async onDelete(project) {
    await this.httpService.delete(`/project/${project._id}`, this.credentialsForm)
    .subscribe()
    this.projectDeleted.emit();
  }

}

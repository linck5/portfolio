import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/globalServices/http-service/http.service'
import { NotificationService, NotificationType } from 'src/app/globalServices/notification/notification.service'
import { CredentialsService } from '../../credentials.service'

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss', '../../admin-cp.shared.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() project:any
  @Output() projectDeleted = new EventEmitter<string>();
  @Output() projectCopied = new EventEmitter<string>();

  @ViewChild('collapsible') collapsible;
  @ViewChild('content') content;

  constructor(
    private httpService: HttpService,
    private credentialsService:CredentialsService,
    private notificationService:NotificationService
  ) { }

  ngOnInit() {
    this.addCollapsibleBehavior()
  }

  private addCollapsibleBehavior(){

    this.collapsible.nativeElement.classList.add("collapsed-button");
    this.content.nativeElement.classList.add("collapesd-content");

    this.collapsible.nativeElement.addEventListener("click", function(event) {
      this.collapsible.nativeElement.classList.toggle("expanded-button");
      this.collapsible.nativeElement.classList.toggle("collapsed-button");
      this.content.nativeElement.classList.toggle("expanded-content");
      this.content.nativeElement.classList.toggle("collapesd-content");
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
    let res = await this.httpService.delete(`/project/${project._id}`, this.credentialsService.credentials)
    .toPromise()
    .catch((err)=>{
      console.log(err)
      this.notificationService.notify(
        `Error: ${err.status} ${err.statusText}. See console for more info.`,
        NotificationType.Danger, 2.5)
    })
    if(res){
      console.log(this.project)
      this.notificationService.notify(
        "Success. Project deleted. Deleted doc is on the console.",
        NotificationType.Success, 2)
      this.projectDeleted.emit();
    }
  }

}

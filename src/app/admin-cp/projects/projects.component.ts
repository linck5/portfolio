import { Component, OnInit } from '@angular/core';
import { ProjectForm } from './add-project-form/add-project-form.component'
import { HttpService } from 'src/app/globalServices/http-service/http.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', '../admin-cp.shared.scss']
})
export class ProjectsComponent implements OnInit {

  public projects;

  public copiedProjectFromData;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.updateProjectsList()
  }

  projectCopiedEvent(project){
    this.copiedProjectFromData = project
  }

  public async updateProjectsList(){
    let res = await this.httpService.get('/projects').toPromise();
    this.projects = res;
  }
}

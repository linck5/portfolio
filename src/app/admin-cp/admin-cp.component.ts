import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/globalServices/http-service/http.service';
import { ProjectForm } from './add-project-form/add-project-form.component'


@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.scss', './admin-cp.shared.scss']
})
export class AdminCpComponent implements OnInit {

  public projects;
  public credentialsForm = {username: '', password: ''};
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

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

class ProjectForm {

  constructor(
    public title: string,
    public year: number,
    public month: number,
    public description: string,
    public type: string,
    public imageUrl?: string,
    public workUrl?: string,
    public sourceCodeUrl?: string,
  ) {  }

}

@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.scss']
})
export class AdminCpComponent implements OnInit {

  public projects;

  public credentialsForm = {username: '', password: ''};



  public projectForm:ProjectForm = new ProjectForm('', 2000, 1, '', 'web');

  constructor(private http: HttpClient) { }

  async onSubmit() {
    console.log(this.projectForm)
    await this.postProjectFromForm(this.projectForm)

    this.updateProjectsList()

  }

  ngOnInit() {

    this.updateProjectsList()

  }

  private updateProjectsList(){
    this.http.get(environment.api_url + '/projects').subscribe(data => this.projects = data)
  }

  private async postProjectFromForm(form){

    console.log(this.credentialsForm)

    let projectObj = {
        "title": form.title,
        "date": this.yearMonth2Date(form.year, form.month),
        "imageUrl": form.imageUrl,
        "description": form.description,
        "type": form.type,
        "workUrl": form.workUrl,
        "sourceCodeUrl": form.sourceCodeUrl,
    }

    return this.http.post(
      environment.api_url + '/projects',
      projectObj,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa(`${this.credentialsForm.username}:${this.credentialsForm.password}`)
        })
      }
    ).subscribe(data => console.log(data))
  }

  private yearMonth2Date(year, month){
    return new Date(year, month - 1 /*starts from zero*/, 1);
  }

}

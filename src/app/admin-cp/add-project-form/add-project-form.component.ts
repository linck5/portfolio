import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.scss']
})
export class AddProjectFormComponent implements OnInit {

  public projectForm:ProjectForm = new ProjectForm('', 2000, 1, '', 'web');



  @Input() credentialsForm; //TODO type it
  @Output() projectAdded = new EventEmitter<string>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async onSubmit() {
    console.log(this.projectForm)
    await this.postProjectFromForm(this.projectForm)

    this.projectAdded.emit('a');

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
      { headers: this.getHeaders() }
    ).subscribe(data => console.log(data))
  }

  private getHeaders(){
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(`${this.credentialsForm.username}:${this.credentialsForm.password}`)
    })
  }

  private yearMonth2Date(year, month){
    return new Date(year, month - 1 /*starts from zero*/, 1);
  }

}

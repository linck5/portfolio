import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-admin-cp',
  templateUrl: './admin-cp.component.html',
  styleUrls: ['./admin-cp.component.scss']
})
export class AdminCpComponent implements OnInit {

  public projects;

  public credentialsForm = {username: '', password: ''};





  constructor(private http: HttpClient) { }



  ngOnInit() {

    this.updateProjectsList()

  }

  public updateProjectsList(){
    this.http.get(environment.api_url + '/projects').subscribe(data => this.projects = data)
  }





}

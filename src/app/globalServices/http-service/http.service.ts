import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface BasicAuthCredentials {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private getJsonWithCredentialsHeaders = credentials => new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
  });

  public get(path: string){
    return this.http.get(environment.api_url + path)
  }

  public post(path: string, obj: Object, credentials: BasicAuthCredentials){
    return this.http.post(
      environment.api_url + path,
      obj,
      { headers: this.getJsonWithCredentialsHeaders(credentials) }
    )
  }

  public delete(path: string, credentials: BasicAuthCredentials){
    return this.http.delete(
      environment.api_url + path,
      { headers: this.getJsonWithCredentialsHeaders(credentials) }
    )
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  public credentials = {
    username: '',
    password: '',
  }

  constructor() { }

}
